import React, { useState } from 'react';
import { motion } from 'motion/react';

interface CompanionLogoProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const CompanionLogo: React.FC<CompanionLogoProps> = ({
  size = 40,
  className = '',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      whileHover={interactive ? { scale: 1.08 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-label="Fluidise companion logo"
      role="img"
    >
      <svg
        viewBox="0 0 128 128"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.2)]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left curly bracket */}
        <motion.path
          d="M 38 24 C 28 24 24 32 24 44 L 24 54 C 24 60 20 64 14 64 C 20 64 24 68 24 74 L 24 84 C 24 96 28 104 38 104"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          animate={isHovered ? { x: -2 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />

        {/* Right curly bracket */}
        <motion.path
          d="M 90 24 C 100 24 104 32 104 44 L 104 54 C 104 60 108 64 114 64 C 108 64 104 68 104 74 L 104 84 C 104 96 100 104 90 104"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          animate={isHovered ? { x: 2 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />

        {/* Left Eye */}
        <motion.circle
          cx="48"
          cy="52"
          r="4.5"
          animate={isHovered ? { scaleY: 0.2 } : { scaleY: 1 }}
          transition={{ duration: 0.15 }}
        />

        {/* Right Eye */}
        <motion.circle
          cx="80"
          cy="52"
          r="4.5"
          animate={isHovered ? { scaleY: 0.2 } : { scaleY: 1 }}
          transition={{ duration: 0.15 }}
        />

        {/* Half Smile */}
        <motion.path
          d="M 52 74 C 58 82 72 82 78 72"
          fill="none"
          stroke="currentColor"
          strokeWidth="5.5"
          strokeLinecap="round"
          animate={isHovered ? { d: 'M 50 72 C 60 86 74 86 80 70' } : { d: 'M 52 74 C 58 82 72 82 78 72' }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        />
      </svg>
    </motion.div>
  );
};
