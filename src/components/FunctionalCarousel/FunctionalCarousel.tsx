import './FunctionalCarousel.scss';

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import { useInView } from 'react-intersection-observer';

const FunctionalCarouselContext = createContext({
  rootRef: null,
  onEnterView: null,
  selected: null,
});

export const FunctionalCarousel = (props) => {
  const { children, selected, onEnterView } = props;
  const ref = useRef(null);

  const scrollToSelected = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left:
          Number.parseFloat(
            window.getComputedStyle(ref.current).width.replace('px', ''),
          ) * selected,
        behavior: 'smooth',
      });
    }
  };

  useLayoutEffect(() => {
    scrollToSelected();
  }, [selected]);

  return (
    <FunctionalCarouselContext.Provider
      value={{ rootRef: ref, onEnterView, selected }}
    >
      <div ref={ref} className="functional-carousel">
        <div>{children}</div>
      </div>
    </FunctionalCarouselContext.Provider>
  );
};

export const FunctionalCarouselElement = (props) => {
  const { children, selector } = props;
  const { rootRef, selected, onEnterView } = useContext(
    FunctionalCarouselContext,
  );
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
    root: rootRef.current,
  });

  useLayoutEffect(() => {
    if (selected !== selector && inView) {
      onEnterView && onEnterView(selector);
    }
  }, [inView]);

  return (
    <div ref={ref} className="functional-carousel-element">
      {children}
    </div>
  );
};
