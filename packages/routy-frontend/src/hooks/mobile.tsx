import React from 'react';

import { token } from '~/styled-system/tokens/index.mjs';

export function useOnMobile() {
  const widthBreakpoint = React.useMemo(() => Number.parseInt(token('sizes.breakpoint-sm')), []);

  const [onMobile, setOnMobile] = React.useState(window.innerWidth < widthBreakpoint);

  React.useEffect(() => {
    const handleResize = () => {
      setOnMobile(window.innerWidth < widthBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setOnMobile, widthBreakpoint]);

  return onMobile;
}
