import useScroll from '../hooks/useScroll';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GoToTop() {
  const { scrollDirection, scrollPosition, scrollToTop } = useScroll();

  return (
    <div
      onClick={scrollToTop}
      className={`group w-12 h-12 bg-black fixed bottom-6 right-3 md:bottom-12 md:right-12 z-10 transition origin-[1px] duration-150 rounded-md cursor-pointer shadow-xl flex items-center justify-center ${
        scrollDirection == 1 && scrollPosition > 150 ? 'translate-y-0' : 'translate-y-28'
      }`}
    >
      <FontAwesomeIcon icon={faArrowUp} className="group-hover:animate-bounce" />
    </div>
  );
}
