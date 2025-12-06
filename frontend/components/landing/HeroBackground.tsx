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

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

export default function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer loading of the heavy 3D scene to completely avoid blocking initial performance metrics
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startLoading = () => {
      // Wait 10 seconds after page is fully loaded before loading the 3D scene
      timer = setTimeout(() => {
        setShouldLoad(true);
      }, 10000);
    };

    // Wait for the page to be fully loaded (all resources downloaded)
    if (document.readyState === 'complete') {
      startLoading();
    } else {
      window.addEventListener('load', startLoading);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', startLoading);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <div className={`w-full h-full flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}>
        <div className="w-[400px] h-[800px] md:w-full md:h-full flex items-center justify-center">
          {shouldLoad && (
            <Spline
              scene="https://prod.spline.design/b7rLFPi8bmCZyCzC/scene.splinecode"
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </div>
      </div>
      {/* Edge gradients to hide Spline badge */}
      <div className="absolute top-0 right-0 bottom-0 w-48 pointer-events-none bg-gradient-to-l from-black via-black/50 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-48 pointer-events-none bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
  );
}
