import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Flex } from '~/styled-system/jsx/flex.mjs';
import { PauseIcon, PlayIcon, StopIcon } from '~/icons/react-icons.js';
import { Page } from '~/components/root/Page.js';
import { Switch } from '~/components/general/Switch.js';
import { Button } from '~/components/general/Button.js';

export const Route = createFileRoute('/_authorized/timer')({ component: TimerPage });

const TIMER_TICK_TIME = 1_000;

function TimerPage(): React.JSX.Element {
  const [started, setStarted] = React.useState<Date | null>(null);
  const [progressOffset, setProgressOffset] = React.useState(0);
  const [ticking, setTicking] = React.useState(false);
  const [span, setSpan] = React.useState(5);

  const svgRef = React.createRef<SVGSVGElement>();

  const stopTimer = React.useCallback(() => {
    setTicking(false);
    setStarted(null);
    setProgressOffset(0);
    if (svgRef.current) {
      svgRef.current.style.marginTop = `100%`;
    }
  }, [svgRef]);

  const getCurrentProgress = React.useCallback(() => {
    const ticksElapsed = (Date.now() - Number(started)) / TIMER_TICK_TIME;
    return progressOffset + (ticksElapsed / ((span * 1_000) / TIMER_TICK_TIME)) * 100;
  }, [progressOffset, span, started]);

  React.useEffect(() => {
    if (ticking) {
      const interval = setInterval(() => {
        if (started) {
          const progress = getCurrentProgress();
          if (progress >= 100) {
            stopTimer();
            return;
          }
          if (svgRef.current) {
            svgRef.current.style.marginTop = `${100 - progress}%`;
          }
        }
      }, TIMER_TICK_TIME);
      return () => clearInterval(interval);
    }
  }, [getCurrentProgress, progressOffset, span, started, stopTimer, svgRef, ticking]);

  const handlePlayClick = React.useCallback(() => {
    if (started) {
      stopTimer();
    } else {
      setTicking(true);
      setStarted(new Date());
    }
  }, [started, stopTimer]);

  const handlePauseClick = React.useCallback(() => {
    setTicking(current => {
      if (current) {
        setProgressOffset(getCurrentProgress());
      } else {
        setStarted(new Date());
      }
      return !current;
    });
  }, [getCurrentProgress]);

  return (
    <Page title="Timer" justify="center" align="center" height="full">
      <Flex marginBottom="lg" direction="column" gap="sm">
        {/* See panda config for styles */}
        <div className="timer-wrapper">
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
                { value: '5', label: '5m' },
                { value: '15', label: '15m' },
                { value: '20', label: '20m' },
                { value: '25', label: '25m' },
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
