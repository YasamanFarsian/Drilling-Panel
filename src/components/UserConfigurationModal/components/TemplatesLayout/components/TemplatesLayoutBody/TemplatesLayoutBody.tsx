import EastRoundedIcon from '@mui/icons-material/EastRounded';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { ButtonBase, IconButton } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import EmptyTemplateLayout from './components/EmptyTemplateLayout';
import TemplateLayoutCard from './components/TemplateLayoutCard';
import TemplateLayoutSkeletonLoading from './components/TemplateLayoutSkeletonLoading';
import { emblaStyle } from './TemplatesLayoutBody.style';
import { useAutoScrollToLastSnap } from './useAutoScrollToLastSnap';
import { useAutoScrollToSelectedTemplate } from './useAutoScrollToSelectedTemplate';
import { useGetTemplateLayouts } from './useGetTemplateLayouts';
import { useSetupEmblaCarousel } from './useSetupEmblaCarousel';

// eslint-disable-next-line max-lines-per-function
const TemplatesLayoutBody = (): JSX.Element => {
  const { isLoadingApiLayouts, layoutData, currentSelectedLayout } = useGetTemplateLayouts();
  const {
    emblaRef,
    emblaApi,
    prevBtnDisabled,
    nextBtnDisabled,
    scrollPrev,
    scrollNext,
    scrollTo,
    scrollSnaps,
    selectedIndex,
  } = useSetupEmblaCarousel(layoutData);

  useAutoScrollToLastSnap(layoutData, emblaApi);
  useAutoScrollToSelectedTemplate(layoutData, emblaApi);

  if (isLoadingApiLayouts) {
    return <TemplateLayoutSkeletonLoading />;
  }

  if (layoutData.length === 0) {
    return <EmptyTemplateLayout />;
  }

  return (
    <div data-testid="templates_layout_body" css={emblaStyle} className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {layoutData.map((layout) => (
            <div key={layout.id} className={clsx('embla__slide')}>
              <TemplateLayoutCard currentSelectedLayout={currentSelectedLayout} {...layout} />
            </div>
          ))}
        </div>
      </div>
      <div className={clsx('embla__footer', scrollSnaps.length <= 1 && 'embla__footer_hidden')}>
        <IconButton className="embla__button" disabled={prevBtnDisabled} onClick={scrollPrev}>
          <div className="circle" />
          <WestRoundedIcon />
        </IconButton>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => {
            const selected = index === selectedIndex;
            return (
              <ButtonBase
                disableRipple
                key={index}
                className={clsx('embla__dot', selected && 'embla__dot--selected')}
                onClick={() => scrollTo(index)}
              />
            );
          })}
        </div>
        <IconButton className="embla__button" disabled={nextBtnDisabled} onClick={scrollNext}>
          <div className="circle" />
          <EastRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TemplatesLayoutBody;
