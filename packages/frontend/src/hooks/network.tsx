import React from 'react';

export function useNetworkState() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  const updateOnlineStatus = React.useCallback(() => setIsOnline(navigator.onLine), []);

  React.useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [updateOnlineStatus]);

  return isOnline;
}
