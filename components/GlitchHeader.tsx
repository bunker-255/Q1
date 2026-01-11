import React from 'react';

interface GlitchHeaderProps {
  text: string;
  subtext?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GlitchHeader: React.FC<GlitchHeaderProps> = ({ text, subtext, size = 'xl' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-7xl md:text-9xl'
  };

  return (
    <div className="relative group select-none">
      <h1 className={`font-bold uppercase tracking-tighter ${sizeClasses[size]} text-white relative z-10 mix-blend-difference`}>
        {text}
      </h1>
      <h1 className={`font-bold uppercase tracking-tighter ${sizeClasses[size]} text-green-500 absolute top-0 left-0 -z-10 opacity-70 animate-pulse translate-x-[2px]`}>
        {text}
      </h1>
      <h1 className={`font-bold uppercase tracking-tighter ${sizeClasses[size]} text-fuchsia-500 absolute top-0 left-0 -z-10 opacity-70 animate-pulse -translate-x-[2px] translate-y-[1px]`}>
        {text}
      </h1>
      
      {subtext && (
        <p className="mt-4 text-green-400 font-mono text-sm md:text-xl tracking-widest uppercase border-l-2 border-green-500 pl-4 animate-pulse">
          &gt; {subtext} <span className="animate-ping inline-block w-2 h-2 bg-green-500 rounded-full ml-2"></span>
        </p>
      )}
    </div>
  );
};

export default GlitchHeader;