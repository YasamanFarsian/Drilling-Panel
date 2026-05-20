/* eslint-disable max-lines-per-function */
import React from 'react';
import type { SVGType } from '../WellboreChartHelper';

type BottomHoleAssemblyProps = {
  bhaTransform: SVGType['bhaTransform'];
  bitRotation: boolean;
};
export const BottomHoleAssembly = ({ bhaTransform, bitRotation }: BottomHoleAssemblyProps) => (
  <>
    <defs>
      <linearGradient id="bhaGradient1">
        <stop offset="0" stopColor="#000000" />
        <stop offset="0.35" stopColor="#CCCCCC" />
        <stop offset="1" stopColor="#000000" />
      </linearGradient>
      <linearGradient
        id="bhaGradient2"
        y1="14"
        x1="0"
        y2="-14"
        x2="0"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#bhaGradient1"
      />
      {/*  prettier-ignore */}
      <pattern id='sand' viewBox='0 0 100 100' width='40' height='40' patternUnits='userSpaceOnUse'>
            <rect width='100' height='100' fill='lightyellow'/><circle cx='4' cy='3' r='2.5'/><circle cx='27' cy='3.2' r='2.5'/><circle cx='44' cy='3.2' r='2.5'/>
            <circle cx='69' cy='4.2' r='2.5'/><circle cx='17' cy='14' r='2.5'/><circle cx='40' cy='28' r='2.5'/><circle cx='65' cy='22' r='2.5'/><circle cx='84' cy='19' r='2.5'/>
            <circle cx='15' cy='29' r='2.5'/><circle cx='4' cy='40' r='2.5'/><circle cx='21' cy='45' r='2.5'/><circle cx='39' cy='47' r='2.5'/><circle cx='50' cy='38' r='2.5'/>
            <circle cx='69' cy='39' r='2.5'/><circle cx='96' cy='29' r='2.5'/><circle cx='90' cy='42' r='2.5'/><circle cx='8.8' cy='55' r='2.5'/><circle cx='56' cy='55' r='2.5'/>
            <circle cx='79' cy='54' r='2.5'/><circle cx='18' cy='74' r='2.5'/><circle cx='35' cy='66' r='2.5'/><circle cx='56' cy='72' r='2.5'/><circle cx='76' cy='73' r='2.5'/>
            <circle cx='92' cy='66' r='2.5'/><circle cx='94' cy='78' r='2.5'/><circle cx='6.4' cy='81' r='2.5'/><circle cx='44' cy='79' r='2.5'/><circle cx='12' cy='95' r='2.5'/>
            <circle cx='26' cy='90' r='2.5'/><circle cx='48' cy='91' r='2.5'/><circle cx='70' cy='92' r='2.5'/><circle cx='91' cy='97' r='2.5'/>
          </pattern>
      {/*  prettier-ignore */}
      <pattern id='clay' viewBox='0 0 100 100' width='40' height='40' patternUnits='userSpaceOnUse'>
            <rect width='100' height='100' fill='lightgray'/><rect x='-23' y='1' width='47' height='2.2'/><rect x='42' y='1' width='47' height='2.2'/><rect x='8.5' y='22' width='47' height='2.2'/>
            <rect x='73' y='22' width='47' height='2.2'/><rect x='-35' y='42' width='47' height='2.2'/><rect x='30' y='42' width='47' height='2.2'/><rect x='95' y='42' width='47' height='2.2'/>
            <rect x='2.6' y='61' width='47' height='2.2'/><rect x='67' y='61' width='47' height='2.2'/><rect x='-38' y='81' width='47' height='2.2'/><rect x='27' y='81' width='47' height='2.2'/>
            <rect x='92' y='81' width='47' height='2.2'/>
          </pattern>
    </defs>
    <g transform={bhaTransform}>
      <path
        transform="translate(0 0)"
        d="M0 0 v-7 l7 -3 h33 l5 -4 h10
              l5 5 l-5 5
              l5 4 l-5 4
              l5 5 l-5 5
              h-10 l-5 -4 h-33 l-7 -3 z"
        stroke="black"
        fill="url(#bhaGradient2)"
      />
      <g transform="translate(40,0) scale(.1)" style={{ stroke: 'black', strokeWidth: 40 }}>
        <line y1="-100" x2="200" y2="-100" />
        <line y1="-100" x2="200" y2="-100">
          {bitRotation && (
            <>
              <animate
                attributeName="y1"
                values="-100; -100; -97; -90; -78; -62"
                dur=".5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="-100; -97; -90; -78; -62; -43"
                dur=".5s"
                repeatCount="indefinite"
              />
            </>
          )}
        </line>
        <line y1="-62" x2="200" y2="-43">
          {bitRotation && (
            <>
              <animate
                attributeName="y1"
                values="-62; -43; -22; 0; 22; 43"
                dur=".5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="-43; -22; 0; 22; 43; 62"
                dur=".5s"
                repeatCount="indefinite"
              />
            </>
          )}
        </line>
        <line y1="43" x2="200" y2="62">
          {bitRotation && (
            <>
              <animate
                attributeName="y1"
                values="43; 62; 78; 90; 97; 100"
                dur=".5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="62; 78; 90; 97; 100; 100"
                dur=".5s"
                repeatCount="indefinite"
              />
            </>
          )}
        </line>
        <line y1="100" x2="200" y2="100" />
      </g>
    </g>
  </>
);
