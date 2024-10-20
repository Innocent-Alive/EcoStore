import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export const NextArrow = (props) => {
  const { onClick } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  }, []);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute top-[40%] right-1 transform cursor-pointer z-10 rounded-lg border-2 p-2 transition-all duration-500 ease-out
        ${isHovered ? "border-secondary shadow-xl" : "border-primary shadow-md"}
        ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        } xl:bg-transparent bg-background`}
    >
      <ChevronRight
        className={`w-6 h-10 transform transition-transform duration-300 ease-out
        ${
          isHovered
            ? "translate-x-1 text-secondary"
            : "translate-x-0 text-primary"
        }`}
      />
    </div>
  );
};

export const PrevArrow = (props) => {
  const { onClick } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  }, []);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute top-[40%] left-1 transform cursor-pointer z-10 rounded-lg border-2 p-2 transition-all duration-500 ease-out
        ${isHovered ? "border-secondary shadow-xl" : "border-primary shadow-md"}
        ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        } xl:bg-transparent bg-background`}
    >
      <ChevronLeft
        className={`w-6 h-10 transform transition-transform duration-300 ease-out
        ${
          isHovered
            ? "-translate-x-1 text-secondary"
            : "translate-x-0 text-primary"
        }`}
      />
    </div>
  );
};

export default { PrevArrow, NextArrow };
