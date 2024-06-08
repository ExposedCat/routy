import type { z } from 'zod';

import type { AnyApiCall } from './query.js';

export const BACKEND_API_ENDPOINT = 'http://192.168.0.80:8080'; // TODO:

export function buildApiCallUrl<T extends AnyApiCall>(args: {
  apiCall: T;
  urlParams?: z.infer<T['UrlParamsSchema']>;
  query?: z.infer<T['QuerySchema']>;
  prefixWithSlash?: boolean;
  skipSearch?: boolean;
}): string {
  const { apiCall, urlParams, prefixWithSlash = false, skipSearch = false, query } = args;

  let pathTpl = apiCall.PathTemplate;
  if (prefixWithSlash) {
    pathTpl = `/${pathTpl}`;
  }
  let filledPath = fillUrlParamsInUrl(pathTpl, urlParams ?? null, skipSearch);
  if (query) {
    const searchParams = queryToSearchParams(apiCall.QuerySchema.parse(query));
    const paramsPrefix = filledPath.includes('?') ? '&' : '?';
    filledPath += `${paramsPrefix}${searchParams.toString()}`;
  }

  const baseUrl = {
    local: '',
    backend: BACKEND_API_ENDPOINT,
  }[apiCall.target ?? 'backend'];

  return `${baseUrl}${filledPath}`;
}

export function fillUrlParamsInUrl(url: string, params: Record<string, string> | null, skipSearch = false): string {
  const [base, search] = url.split('?');
  let filledPath = skipSearch ? base : url;
  if (params) {
    for (const urlParam of Object.entries(params)) {
      filledPath = filledPath.replace(`$${urlParam[0]}`, urlParam[1]);
    }
  }
  if (skipSearch && search) {
    filledPath += `?${search}`;
  }
  return filledPath;
}

export function queryToSearchParams(query: Record<string, any>): URLSearchParams {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    for (const one of Array.isArray(value) ? value.map(it => String(it)) : [String(value)]) {
      sp.append(key, one);
    }
  }
  return sp;
}

export const staticImageUrl = (name: string, format: 'webp' | 'jpg' | 'png' = 'webp') =>
  `${BACKEND_API_ENDPOINT}/static/${name}.${format}`;

export const modelImageUrl = (id: string, options: { small?: boolean } = {}) => {
  // this generates a number from 1 to 10 based on the model id
  const strToNum = (id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10) + 1;
  return staticImageUrl(`model_${strToNum}${options && options.small ? '_small' : ''}`, 'jpg');
};
