/* eslint-disable max-lines, max-lines-per-function */
import React, { SVGProps } from 'react';
import Filter from '../Filter';
import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export type LoadingDarkPropsType = SVGProps<SVGSVGElement>;

const LoadingDark = (props: LoadingDarkPropsType): JSX.Element => {
  return (
    <svg
      role="loading-dark"
      data-testid="loading-dark"
      width={`${scalePxAsVw(84)}px`}
      height={`${scalePxAsVh(85)}px`}
      viewBox="0 0 84 85"
      {...props}
    >
      <defs>
        <rect id="b" x={4} y={15} width={'4.0rem'} height={'4.0rem'} rx={20} />
        <filter
          x="-18.8%"
          y="-13.8%"
          width="137.5%"
          height="137.5%"
          filterUnits="objectBoundingBox"
          id="a"
        >
          <feMorphology
            radius={0.5}
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          />
          <feOffset dy={2} in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation={2} in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13548951 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <rect id="d" x={44} y={38} width={'3.6rem'} height={'3.6rem'} rx={18} />
        <filter
          x="-20.8%"
          y="-15.3%"
          width="141.7%"
          height="141.7%"
          filterUnits="objectBoundingBox"
          id="c"
        >
          <feMorphology
            radius={0.5}
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          />
          <feOffset dy={2} in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation={2} in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13548951 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <rect id="f" x={28} y={4} width={'3.2rem'} height={'3.2rem'} rx={16} />
        <filter
          x="-23.4%"
          y="-17.2%"
          width="146.9%"
          height="146.9%"
          filterUnits="objectBoundingBox"
          id="e"
        >
          <feMorphology
            radius={0.5}
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          />
          <feOffset dy={2} in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation={2} in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13548951 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <rect id="h" x={28} y={66} width={'1.6rem'} height={'1.6rem'} rx={8} />
        <Filter />
      </defs>
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#a)" xlinkHref="#b" />
        <use
          strokeOpacity={0.234812063}
          stroke="#17171F"
          fillOpacity={0.347765516}
          fill="#999"
          xlinkHref="#b"
        />
        <use fill="#000" filter="url(#c)" xlinkHref="#d" />
        <use
          strokeOpacity={0.234812063}
          stroke="#17171F"
          fillOpacity={0.347765516}
          fill="#6A6868"
          xlinkHref="#d"
        />
        <g>
          <use fill="#000" filter="url(#e)" xlinkHref="#f" />
          <use
            strokeOpacity={0.234812063}
            stroke="#17171F"
            fillOpacity={0.347765516}
            fill="#4A4A4A"
            xlinkHref="#f"
          />
        </g>
        <g>
          <use fill="#000" filter="url(#g)" xlinkHref="#h" />
          <use
            strokeOpacity={0.234812063}
            stroke="#17171F"
            fillOpacity={0.347765516}
            fill="#4A4A4A"
            xlinkHref="#h"
          />
        </g>
      </g>
    </svg>
  );
};

export default LoadingDark;
