import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const TubeFillComponent = ({ fillPercentage, color }) => {
  const safeFillPercentage = Math.min(100, Math.max(0, fillPercentage));
  const filledWidth = 112 * (safeFillPercentage / 100);

  return (
    <Svg xmlns='http://www.w3.org/2000/svg' width='112' height='4' viewBox='0 0 112 4' fill='none'>
      <Rect x='0' y='0' width='112' height='4' rx='2' fill='#E3E3E3' />
      <Rect x='0' y='0' width={filledWidth} height='4' rx='2' fill={color || '#2CC672'} />
    </Svg>
  );
};

export default TubeFillComponent;
