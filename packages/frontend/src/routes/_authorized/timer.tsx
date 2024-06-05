import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MINUTE, SECOND } from '@routy/routy-shared';

import { PauseIcon, PlayIcon, StopIcon } from '~/icons/react-icons.js';
import { Page } from '~/components/root/Page.js';
import { PageTitle } from '~/components/general/Text.js';
import { Switch } from '~/components/general/Switch.js';
import { Flex } from '~/components/general/Flex.js';
import { Button } from '~/components/general/Button.js';

export const Route = createFileRoute('/_authorized/timer')({ component: TimerPage });

function TimerPage(): React.JSX.Element {
  const [started, setStarted] = React.useState(false);
  const [ticking, setTicking] = React.useState(false);
  const [span, setSpan] = React.useState(5 * MINUTE);
  const [progress, setProgress] = React.useState(0);

  const left = React.useMemo(() => {
    const diff = span - progress;
    const minutes = (diff / MINUTE) | 0;
    const seconds = ((diff - minutes * MINUTE) / SECOND) | 0;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, [progress, span]);

  const svgRef = React.createRef<SVGSVGElement>();

  const stopTimer = React.useCallback(() => {
    setTicking(false);
    setStarted(false);
    setProgress(0);
    if (svgRef.current) {
      svgRef.current.style.marginTop = `100%`;
    }
  }, [svgRef]);

  React.useEffect(() => {
    if (ticking) {
      const interval = setInterval(() => {
        if (started && ticking) {
          if (progress >= span) {
            stopTimer();
            return;
          }
          setProgress(current => {
            const newProgress = current + SECOND;
            if (svgRef.current) {
              svgRef.current.style.marginTop = `${(1 - newProgress / span) * 100 - 10}%`;
            }
            return newProgress;
          });
        }
      }, SECOND);
      return () => clearInterval(interval);
    }
  }, [progress, span, started, stopTimer, svgRef, ticking]);

  const handlePlayClick = React.useCallback(() => {
    if (started) {
      stopTimer();
    } else {
      setStarted(true);
      setTicking(true);
    }
  }, [started, stopTimer]);

  const handlePauseClick = React.useCallback(() => {
    setTicking(current => !current);
  }, []);

  return (
    <Page title="Timer" justify="center" align="center" height="full">
      <Flex marginBottom="lg" direction="column" gap="sm">
        {/* See panda config for styles */}
        <div className="timer-wrapper">
          <Flex position="absolute" full align="center" justify="center" zIndex={10}>
            <PageTitle font="monospace" text={left} color={progress > span * 0.6 ? 'white' : undefined} />
          </Flex>
          <div>
            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(37,150,190,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(37,150,190,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(37,150,190,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(37,150,190)" />
              </g>
            </svg>
            <div />
          </div>
        </div>
        <Flex direction="column" align="center" gap="sm" width="full">
          {!started && (
            <Switch
              width="full"
              value={span.toString()}
              items={[
                { value: `${30 * SECOND}`, label: '30s' },
                { value: `${5 * MINUTE}`, label: '5m' },
                { value: `${15 * MINUTE}`, label: '15m' },
                { value: `${20 * MINUTE}`, label: '20m' },
                { value: `${25 * MINUTE}`, label: '25m' },
              ]}
              onChange={value => setSpan(Number(value))}
            />
          )}
          <Flex gap="sm" justify="center" width="full">
            <Button
              width="full"
              colorVariant={started ? 'error' : 'active'}
              label={started ? 'End' : 'Start'}
              icon={started ? StopIcon : PlayIcon}
              onClick={handlePlayClick}
            />
            {started && (
              <Button
                width="full"
                colorVariant={ticking ? 'warning' : 'success'}
                label={ticking ? 'Pause' : 'Resume'}
                icon={ticking ? PauseIcon : PlayIcon}
                onClick={handlePauseClick}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
}
