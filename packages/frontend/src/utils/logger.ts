/* eslint-disable no-var */
import { serializeError } from 'serialize-error';
import type { ErrorObject } from 'serialize-error';
import { stringify } from 'safe-stable-stringify';
import chalk from 'chalk';
import type { ChalkInstance } from 'chalk';

import { formatDate } from './datetime.js';

declare global {
  var ENV: Record<string, string> | undefined;
}

export type LoggerConfig = {
  level: number;
  rootComponent: string;
  format: 'pretty' | 'plain' | 'json';
  runtime: 'development' | 'production' | 'test';
};

export enum LogLevel {
  trace = 10,
  debug = 20,
  info = 30,
  warn = 40,
  error = 50,
  fatal = 60,
}

export type LogFnParamsBase = readonly [message: string];
export type LogFnParamsCtx = readonly [ctx: MessageContext, message: string];
export type LogFnParams = LogFnParamsBase | LogFnParamsCtx;

export function isLogFnParamsCtx(params: LogFnParams): params is LogFnParamsCtx {
  return typeof params[0] !== 'string' && typeof params[1] !== 'undefined';
}

export type Logger = {
  readonly config: LoggerConfig;
  readonly name: string;

  serializeMessage: SerializeMessageFn;
  configure: (config: Partial<LoggerConfig>) => void;
  child: (component: string) => Logger;
  canLogLevel: (level: LogLevel) => boolean;
  trace: (...params: LogFnParams) => void;
  debug: (...params: LogFnParams) => void;
  info: (...params: LogFnParams) => void;
  warn: (...params: LogFnParams) => void;
  error: (...params: LogFnParams) => void;
  fatal: (...params: LogFnParams) => void;
};

export type MessageContext = {
  [key: string]: SupportedContextValue;
};

type SupportedContextValue =
  | string
  | number
  | Date
  | { [key: string]: any }
  | unknown
  | undefined
  | null
  | Error
  | ErrorObject;

export type Message = {
  logger: Logger;
  when: Date;
  context: MessageContext;
  message: string;
  level: number;
  component: string | null;
};

function parseLogFormat(value: string | undefined): LoggerConfig['format'] {
  switch (value) {
    case 'pretty':
    case 'plain':
    case 'json':
      return value;
    default:
      return 'json';
  }
}

function logLevelName(level: unknown) {
  switch (level) {
    case 10:
      return ' T ';
    case 20:
      return ' D ';
    case 30:
      return ' I ';
    case 40:
      return ' W ';
    case 50:
      return ' E ';
    case 60:
      return ' F ';
  }
  return '?????';
}

function colorize(level: unknown): { color: ChalkInstance; bgcolor: ChalkInstance } {
  switch (level) {
    case 10:
      return { color: chalk.gray, bgcolor: chalk.bgGray.black };
    case 20:
      return { color: chalk.gray, bgcolor: chalk.bgGray.black };
    case 30:
      return { color: chalk.white, bgcolor: chalk.bgWhite.black };
    case 40:
      return { color: chalk.yellow, bgcolor: chalk.bgYellow.black };
    case 50:
      return { color: chalk.red, bgcolor: chalk.bgRed.black };
    case 60:
      return { color: chalk.red, bgcolor: chalk.bgRed.black };
  }
  return { color: chalk.gray, bgcolor: chalk.bgGray.black };
}

function customStringify(data: any, useSpaces = true): string {
  return (
    stringify(
      data,
      (_key, value) => {
        if (typeof Buffer !== 'undefined' && value instanceof Buffer) {
          return value.toString('base64');
        }
        return value;
      },
      useSpaces ? 2 : undefined,
    ) ?? ''
  );
}

function prettyMessage(message: Message) {
  const logLevel = message.level ?? 30;
  const { color, bgcolor } = colorize(logLevel);

  const component = message.component ? `/${message.component}` : '';
  const baseMsg: string[] = [
    chalk.gray(formatDate(new Date(message.when), 'time-dayofyear')),
    bgcolor(logLevelName(logLevel)),
    color(`${message.logger.name}${component}`),
    color(':'),
    color(message.message),
  ];

  if (Object.keys(message.context).length > 0) {
    for (const [key, value] of Object.entries(message.context)) {
      if (value instanceof Error) {
        try {
          baseMsg.push(`\n\n[key = ${key} contains Error]\n\n${customStringify(serializeError(value))}`);
        } catch (_) {
          baseMsg.push(`\n\n[key = ${key} contains Error]\n\n${value.name}\n${value.message}`);
        }
        delete message.context[key];
      }
    }
    baseMsg.push(chalk.gray(`\n${customStringify(message.context)}`));
  }

  return baseMsg.join(' ');
}

type SerializeMessageFn = (message: Message) => string;

export function buildSerializeMessage(config: LoggerConfig): SerializeMessageFn {
  if (config.format === 'pretty' || config.runtime === 'development') {
    chalk.level = typeof document !== 'undefined' ? 0 : 3;
    return prettyMessage;
  } else if (config.format === 'json') {
    return (message: Message) => customStringify({ ...message, when: formatDate(message.when, 'iso') }, false);
  } else if (config.format === 'plain') {
    return (message: Message) => {
      const logLevel = message.context.logLevel ?? 30;
      const component = message.context.component ? `/${message.context.component}` : '';
      const baseMsg: string[] = [
        formatDate(message.when, 'time-dayofyear'),
        logLevelName(logLevel),
        `${message.logger.name}${component}`,
        ':',
        message.message,
      ];

      if (Object.keys(message.context).length > 0) {
        baseMsg.push(`\n${customStringify(message.context)}`);
      }
      return baseMsg.join(' ');
    };
  } else {
    throw new Error(`invalid configuration provided ${JSON.stringify(config, undefined, 2)}`);
  }
}

const writeMessage = (msg: Message) => {
  if (msg.level < msg.logger.config.level) return;

  const message = msg.logger.serializeMessage(msg);
  if (typeof document !== 'undefined') {
    console.log(message);
  } else if (typeof process !== 'undefined') {
    process.stdout.write(`${message}\n`);
  } else {
    console.log(message);
  }
};

const buildLogger = (name: string, initialConfig: LoggerConfig): Logger => {
  const _config: LoggerConfig = { ...initialConfig };

  let serializeMessage = buildSerializeMessage(_config);
  const configure = (config: Partial<LoggerConfig>) => {
    Object.assign(_config, config);
    // logger.trace({ config: logger.config }, `reconfigured logger: ${name}`);
    serializeMessage = buildSerializeMessage(_config);
  };

  const buildBoundFns = (opts: { component: string | null }) => {
    const { component } = opts;
    return {
      trace: log.bind({ level: LogLevel.trace, component }),
      debug: log.bind({ level: LogLevel.debug, component }),
      info: log.bind({ level: LogLevel.info, component }),
      warn: log.bind({ level: LogLevel.warn, component }),
      error: log.bind({ level: LogLevel.error, component }),
      fatal: log.bind({ level: LogLevel.fatal, component }),
    };
  };

  function log(this: { level: LogLevel; component: string | null }, ...params: LogFnParams) {
    const ctxIndex = isLogFnParamsCtx(params) ? 0 : -1;
    const message = params.slice(ctxIndex + 1).join(' ');

    writeMessage({
      logger,
      when: new Date(),
      level: this.level,
      context: ctxIndex !== -1 ? (params[ctxIndex] as MessageContext) : {},
      component: this.component,
      message,
    });
  }

  const child = (component: string): Logger => {
    const parent = logger;
    return {
      ...parent,
      ...buildBoundFns({ component }),
    };
  };

  const canLogLevel = (level: LogLevel): boolean => {
    return _config.level <= level;
  };

  const logger: Logger = {
    get config() {
      return _config;
    },
    get name() {
      return _config.rootComponent;
    },
    serializeMessage: msg => {
      if (_config.format !== 'pretty') {
        const newContext = { ...msg.context };
        for (const entry of Object.entries(msg.context)) {
          let value = msg.context[entry[0]];
          if (value instanceof Error) {
            try {
              value = serializeError(value, {
                maxDepth: 3,
              });
            } catch (e) {
              logger.warn({ error: e }, `serialize of error failed`);
              // serialize failed, keep original value
            }
          }
          newContext[entry[0]] = value;
        }
        Object.assign(msg, { context: newContext });
      }

      return serializeMessage(msg);
    },
    child,
    configure,
    canLogLevel,
    ...buildBoundFns({ component: null }),
  };

  // logger.trace({ config: logger.config }, `built logger: ${name}`);

  return logger;
};

const LOG_LEVEL_ENV = globalThis.ENV?.LOG_LEVEL ?? 'info';
const defaultLogger = buildLogger('default', {
  level: (typeof LOG_LEVEL_ENV === 'string' ? parseInt(LOG_LEVEL_ENV) : LOG_LEVEL_ENV) ?? 10,
  rootComponent: globalThis.ENV?.LOG_ROOT_COMPONENT ?? 'logger',
  format: parseLogFormat(globalThis.ENV?.LOG_FORMAT),
  runtime: (globalThis.ENV?.RUNTIME as LoggerConfig['runtime']) ?? 'development',
});

const errorAsContext = (e: unknown): MessageContext => ({ error: e instanceof Error ? e : `${e}` });

export function prettifyMessage(data: string): string {
  const parsed = JSON.parse(data);
  return prettyMessage(parsed);
}

const log = defaultLogger;

export { log, defaultLogger, errorAsContext, serializeError, buildLogger };

(globalThis as any).log = defaultLogger;
