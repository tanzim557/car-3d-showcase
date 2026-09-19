'use client';

import React from 'react';
import Image from 'next/image';

interface HeroBackgroundProps {
  heroText?: string;
  isDayMode?: boolean;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ isDayMode = true }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-0 overflow-hidden transition-colors duration-1000 ${
        isDayMode ? 'bg-[#6FA8DC]' : 'bg-[#0A1020]'
      }`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isDayMode
            ? 'bg-gradient-to-b from-[#87CEEB] via-[#6FA8DC] to-[#4A90E2] opacity-100'
            : 'bg-gradient-to-b from-[#080D18] via-[#0E1726] to-[#0A1020] opacity-100'
        }`}
      />
    </div>
  );
};

