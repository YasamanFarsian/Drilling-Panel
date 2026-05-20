const DESIGN_SCREEN_HEIGHT = 1080;
const DESIGN_SCREEN_WIDTH = 1920;

export const scalePxAsVh = (desiredPx: number) => {
  const currentScreenHeight = window.innerHeight;
  const scaleFactor = currentScreenHeight / DESIGN_SCREEN_HEIGHT;
  return desiredPx * scaleFactor;
};

export const scalePxAsVw = (desiredPx: number) => {
  const currentScreenWidth = window.innerWidth;
  const scaleFactor = currentScreenWidth / DESIGN_SCREEN_WIDTH;
  return desiredPx * scaleFactor;
};

export const scalePxAsVmin = (desiredPx: number) => {
  const pxAsVh = scalePxAsVh(desiredPx);
  const pxAsVw = scalePxAsVw(desiredPx);
  if (pxAsVh < pxAsVw) {
    return pxAsVh;
  } else {
    return pxAsVw;
  }
};
