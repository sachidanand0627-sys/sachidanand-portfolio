import React from 'react';
import GradualBlur from './GradualBlur.jsx';

export default function PageBlur() {
  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="4.5rem"
      strength={2}
      divCount={5}
      curve="bezier"
      exponential
      opacity={1}
      zIndex={40}
      className="pointer-events-none"
    />
  );
}