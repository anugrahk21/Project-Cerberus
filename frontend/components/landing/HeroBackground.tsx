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
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className={`w-full h-full flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}>
          <div className="w-[400px] h-[800px] md:w-full md:h-full flex items-center justify-center">
            <Spline
              scene="https://prod.spline.design/b7rLFPi8bmCZyCzC/scene.splinecode"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>
        {/* Edge gradients to hide Spline badge */}
        <div className="absolute top-0 right-0 bottom-0 w-48 pointer-events-none bg-gradient-to-l from-black via-black/50 to-transparent" />
        <div className="absolute left-0 right-0 bottom-0 h-48 pointer-events-none bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    );
}
