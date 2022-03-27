import { useCallback, useEffect, useState } from 'react';

type ReturnedValueTypes = {
  scrollPosition: number;
  scrollDirection: number;
  scrollToTop: () => void;
};

const useScroll = (): ReturnedValueTypes => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return {
    scrollDirection,
    scrollPosition,
    scrollToTop,
  };
};

export default useScroll;
