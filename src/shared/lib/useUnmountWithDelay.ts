import { useState, useEffect } from 'react';

export function useUnmountWithDelay(show: boolean, delay: number) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (show && !shouldRender) {
      setShouldRender(true);
    } else if (!show && shouldRender) {
      timeout = setTimeout(() => setShouldRender(false), delay);
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return shouldRender;
}
