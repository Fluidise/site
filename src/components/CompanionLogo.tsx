import React from 'react';
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
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.96 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label="Fluidise companion logo"
      role="img"
    >
      <svg
        viewBox="0 0 128 128"
        width={size}
        height={size}
        className="w-full h-full"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Fluidise logo</title>
        <path
          fill="currentColor"
          stroke="none"
          d="M45 17H36C24 17 19 24 19 35V47C19 53 16 57 8 59V71C16 73 19 77 19 83V93C19 105 25 112 37 112H45V96H40C35 96 34 94 34 89V80C34 73 31 68 26 65C31 61 34 56 34 49V39C34 34 35 32 40 32H45ZM83 17H92C104 17 109 24 109 35V47C109 53 112 57 120 59V71C112 73 109 77 109 83V93C109 105 103 112 91 112H83V96H88C93 96 94 94 94 89V80C94 73 97 68 102 65C97 61 94 56 94 49V39C94 34 93 32 88 32H83Z"
        />
        <rect x="47" y="46" width="12" height="23" rx="6" fill="currentColor" stroke="none" />
        <rect x="69" y="46" width="12" height="23" rx="6" fill="currentColor" stroke="none" />
        <path
          d="M56 83Q66 87 74 78"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};
