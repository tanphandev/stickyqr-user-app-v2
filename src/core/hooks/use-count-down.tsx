import { useEffect, useState } from 'react';

const useCountdown = (initialCount: number) => {
  const [countdown, setCountdown] = useState(initialCount);
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      setIsDone(false);
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setIsDone(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const startCountdown = (cd: number) => {
    setCountdown(cd);
  };

  return { countdown, isDone, startCountdown };
};

export default useCountdown;
