import React from 'react';

export const FlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 6H21m-18 0h18M3 6h18M3 6c0 2.28 1.58 4.156 3.75 4.688M21 6c0 2.28-1.58 4.156-3.75 4.688m-11.25 0a3.75 3.75 0 01-3.75 0M12 10.688A3.75 3.75 0 0115.75 6" />
  </svg>
);