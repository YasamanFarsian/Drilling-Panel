import mediaQuery from 'css-mediaquery';
export interface MediaQueryList {
  matches: boolean;
  addListener: (callback: () => void) => void;
  removeListener: (callback: () => void) => void;
}
export function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addListener: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeListener: () => {},
  });
}
