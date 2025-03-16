import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="LAPORPJU Logo" className="h-8 w-auto" />
      {showText && <span className="font-bold text-lg">LAPORPJU</span>}
    </div>
  );
};

export default Logo;
