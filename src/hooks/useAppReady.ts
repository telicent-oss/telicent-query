import { useEffect } from 'react';

// The DS appLoader overlay (injected into index.html by vite.config.js)
// stays up until body has `app-ready`.
export const useAppReady = (isReady: boolean) => {
  useEffect(() => {
    document.body.classList.toggle('app-ready', isReady);
  }, [isReady]);
};
