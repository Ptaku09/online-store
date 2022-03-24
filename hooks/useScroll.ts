import { useCallback, useEffect, useState } from 'react';

type ReturnedValueTypes = {
  scrollPosition: number;
  scrollDirection: number;
};

const useScroll = (): ReturnedValueTypes => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);

  const handleScroll = useCallback(() => {
    if (scrollPosition > window.scrollY) setScrollDirection(1);
    else if (scrollPosition < window.scrollY) setScrollDirection(-1);

    setScrollPosition(window.scrollY);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollDirection,
    scrollPosition,
  };
};

export default useScroll;
