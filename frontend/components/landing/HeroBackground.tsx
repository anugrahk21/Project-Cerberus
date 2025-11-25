/*
Project Cerberus: The AI Iron Dome
Version: 2.0
----------------------------------
Author: Anugrah K.
Role: Frontend Architecture & UI/UX
Description: Spline 3D Hero Background Component
Note: Renders Spline scene as hero section background overlay.
*/

"use client";

import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}>
        <Spline
          scene="https://prod.spline.design/b7rLFPi8bmCZyCzC/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      {/* Edge gradients for right vintage vignette */}
      <div className="absolute top-0 right-0 bottom-0 w-70 pointer-events-none bg-gradient-to-r from-transparent via-black/100 to-black" />
    </div>
  );
}
