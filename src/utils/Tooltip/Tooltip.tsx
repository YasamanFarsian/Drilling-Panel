/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React from 'react';
import cn from '../cn';

type TooltipRootProps = {
  children?: React.ReactNode;
  left?: number;
  top?: number;
  isStatic?: boolean;
};

const TooltipRoot = React.forwardRef(
  (props: TooltipRootProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, left = 0, top = 0, isStatic } = props;

    const styles: React.CSSProperties = {
      position: 'absolute',
      left,
      top,
      pointerEvents: 'none',
      zIndex: 1000,
    };

    return (
      <div
        data-testid="time_based_view--signal_tooltip"
        ref={ref}
        style={isStatic ? undefined : styles}
      >
        {children}
      </div>
    );
  },
);

TooltipRoot.displayName = 'TooltipRoot';

type TooltipContainerProps = {
  children: React.ReactNode;
  hideArrow?: boolean;
  position?: 'top' | 'left' | 'right';
};

const TooltipContainer = React.forwardRef(
  (
    { position = 'top', ...props }: TooltipContainerProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { children, hideArrow } = props;

    return (
      <div className="relative flex min-w-max flex-col ">
        <div
          ref={ref}
          className="flex flex-col items-center rounded-md bg-gray-700/90 p-2 text-white"
        >
          {children}
        </div>
        {!hideArrow && <TooltipArrow position={position} />}
      </div>
    );
  },
);

TooltipContainer.displayName = 'TooltipContainer';

const TooltipArrow = ({ position }: { position: 'top' | 'left' | 'right' }) => {
  let style = {};

  switch (position) {
    case 'left':
      style = {
        top: '50%',
        right: '-6px',
        transform: 'rotate(-90deg)',
      };
      break;
    case 'right':
      style = {
        top: '50%',
        left: '-6px',
        transform: 'rotate(90deg)',
      };
      break;
    case 'top':
    default:
      style = {
        bottom: '-8px',
        left: '50%',
      };
      break;
  }

  return (
    <div
      className={cn(
        'absolute transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-700/90 z-10',
      )}
      style={style}
      data-testid="sek-tooltip-arrow"
    />
  );
};

export const Tooltip = {
  Root: TooltipRoot,
  Container: TooltipContainer,
};
