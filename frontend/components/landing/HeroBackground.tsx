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

import Spline from '@splinetool/react-spline';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Spline
        scene="https://prod.spline.design/b7rLFPi8bmCZyCzC/scene.splinecode" 
      />
      {/* Edge gradients to hide Spline badge */}
      <div className="absolute top-0 right-0 bottom-0 w-48 pointer-events-none bg-gradient-to-l from-black via-black/50 to-transparent" />
      <div className="absolute left-0 right-0 bottom-0 h-48 pointer-events-none bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
  );
}
