import React from 'react';

export const ArchitectSealIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <path id="circlePath" d="M 10, 50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
    </defs>
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
    <text fill="currentColor" fontSize="10" fontFamily="monospace" letterSpacing="2">
      <textPath href="#circlePath">
        KR0M3D1A PROTOCOL *** ARCHITECT'S SEAL OF APPROVAL ***
      </textPath>
    </text>
    <text x="50" y="58" textAnchor="middle" fill="currentColor" fontSize="32" fontFamily="serif" fontWeight="bold">
      ECC
    </text>
    <text x="50" y="70" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace">
      VERBUM SIGNATURE
    </text>
  </svg>
);
