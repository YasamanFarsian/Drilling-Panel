import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { TemplateToSaveType } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

const useReInit = (layoutData: TemplateToSaveType[], emblaApi?: EmblaCarouselType) => {
  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, layoutData]);
};

// eslint-disable-next-line max-lines-per-function
export const useSetupEmblaCarousel = (layoutData: TemplateToSaveType[]) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    speed: 8,
    align: 'start',
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      onSelect();
      setScrollSnaps(emblaApi.scrollSnapList());
    });
    emblaApi.on('settle', () => {
      emblaApi.reInit();
    });
  }, [emblaApi, onSelect]);

  useReInit(layoutData, emblaApi);

  return {
    emblaRef,
    emblaApi,
    prevBtnDisabled,
    nextBtnDisabled,
    scrollPrev,
    scrollNext,
    scrollTo,
    scrollSnaps,
    selectedIndex,
  };
};
