import { EmblaCarouselType } from 'embla-carousel-react';
import { useEffect } from 'react';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { TemplateToSaveType } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

// eslint-disable-next-line max-lines-per-function
export const useAutoScrollToSelectedTemplate = (
  layoutData: TemplateToSaveType[],
  emblaApi?: EmblaCarouselType,
) => {
  const scrollToLastSnapNeeded = useUserConfigurationStore((state) => state.scrollToLastSnapNeeded);
  const selectedTemplateId = useUserConfigurationStore((state) => state.currentSelectedTemplateId);
  const currentSelectedLayout = useUserConfigurationStore((state) => state.currentSelectedLayout);

  useEffect(() => {
    const selectedTemplateIdx = layoutData.findIndex(
      (template) => template.id === selectedTemplateId,
    );

    if (emblaApi && !scrollToLastSnapNeeded && selectedTemplateIdx >= 0) {
      const maxSlidePerSnapInclGap = 3;
      const currentSlideIdx = Math.ceil((selectedTemplateIdx + 1) / maxSlidePerSnapInclGap) - 1;
      emblaApi.scrollTo(currentSlideIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, selectedTemplateId, currentSelectedLayout]); // Didn't add layoutData because it could lead to a bug when layout changed (add/edit widget), and add currentSelectedLayout to make it auto scroll when select new layout
};
