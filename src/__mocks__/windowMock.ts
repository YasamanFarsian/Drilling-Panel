import { createMatchMedia } from '@dt-advisory/hooks/useMatchMedia';
export const mockInnerWidth = (width: number) => {
  const customMatchMedia = createMatchMedia(width);
  Object.defineProperty(window, 'matchMedia', {
    value: customMatchMedia,
    writable: true,
    configurable: true,
  });
};
