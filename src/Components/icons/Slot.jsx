import React from 'react';

export function Slot(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // ✅ allow className, style, etc.
    >
      <mask
        id="mask0_1_387"
        mask-type="luminance" // ✅ use the correct attribute instead of style
        maskUnits="userSpaceOnUse"
        x="1"
        y="2"
        width="18"
        height="17"
      >
        <path
          d="M17.6369 16.7382V4.14772C17.6369 3.8138 17.5042 3.49355 17.2681 3.25744C17.032 3.02132 16.7117 2.88867 16.3778 2.88867H3.78737C3.45345 2.88867 3.1332 3.02132 2.89709 3.25744C2.66097 3.49355 2.52832 3.8138 2.52832 4.14772V16.7382C2.52832 17.0721 2.66097 17.3923 2.89709 17.6284C3.1332 17.8646 3.45345 17.9972 3.78737 17.9972H16.3778C16.7117 17.9972 17.032 17.8646 17.2681 17.6284C17.5042 17.3923 17.6369 17.0721 17.6369 16.7382Z"
          fill="white"
          stroke="white"
          strokeWidth="1.67873"
          strokeLinejoin="round"
        />
        <path
          d="M10.0825 8.05725L8.86711 10.5376L6.10645 10.9379L8.10623 12.8928L7.62821 15.6115L10.0825 14.3034L12.5372 15.6115L12.063 12.8928L14.059 10.9379L11.3139 10.5376L10.0825 8.05725Z"
          fill="black"
          stroke="black"
          strokeWidth="1.67873"
          strokeLinejoin="round"
        />
        <path
          d="M7.69727 5.672H12.4682"
          stroke="black"
          strokeWidth="1.67873"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_1_387)">
        <path d="M0.00976562 0.370605H20.1545V20.5153H0.00976562V0.370605Z" fill="white" />
      </g>
    </svg>
  );
}