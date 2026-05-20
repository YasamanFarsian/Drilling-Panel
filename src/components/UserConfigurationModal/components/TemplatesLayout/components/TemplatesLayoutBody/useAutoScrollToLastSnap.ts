import { EmblaCarouselType } from 'embla-carousel-react';
import { useEffect } from 'react';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { TemplateToSaveType } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

export const useAutoScrollToLastSnap = (
  layoutData: TemplateToSaveType[],
  emblaApi?: EmblaCarouselType,
) => {
  const scrollToLastSnapNeeded = useUserConfigurationStore((state) => state.scrollToLastSnapNeeded);
  const handleScrollToLastSnapSuccess = useUserConfigurationStore(
    (state) => state.handleScrollToLastSnapSuccess,
  );

  // Intentionally call this every time new template created
  useEffect(() => {
    if (emblaApi && scrollToLastSnapNeeded) {
      emblaApi.scrollTo(Infinity);
      handleScrollToLastSnapSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutData]);
};
