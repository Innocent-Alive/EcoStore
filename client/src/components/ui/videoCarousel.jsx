import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";

const VideoCarousel = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleTogglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const items = [
    <img
      src="https://static.vecteezy.com/system/resources/previews/001/937/856/original/paper-art-shopping-online-on-smartphone-sale-promotion-backgroud-banner-for-market-ecommerce-free-vector.jpg"
      alt="Video 1"
    />,
    <img
      src="https://ueeshop.ly200-cdn.com/u_file/UPAU/UPAU159/2202/photo/6f8b38f250.jpg"
      alt="Video 2"
    />,
    <img
      src="https://static.vecteezy.com/system/resources/previews/007/577/924/non_2x/banner-design-for-world-environment-day-earth-day-eco-friendly-and-sustainability-development-concept-illustration-vector.jpg"
      alt="Video 3"
    />,
  ];

  return (
    <div className="relative border-2 border-dotted border-primary rounded-md my-[4rem] overflow-hidden lg:mx-16 md:mx-7 mx-5">
      <AliceCarousel
        autoPlay={isPlaying}
        autoPlayInterval={1000}
        animationDuration={1000}
        animationType="fadeout"
        infinite
        touchTracking={false}
        disableDotsControls
        disableButtonsControls
        items={items}
        key={isPlaying ? "playing" : "paused"}
      />

      <button
        onClick={handleTogglePlayPause}
        className="absolute bottom-1 right-1 sm:bottom-4 sm:right-4  bg-[#838a60] text-[#f4e8da] p-2 rounded-full focus:outline-none transition-colors duration-200 hover:bg-[#6d7451]"
        aria-label={isPlaying ? "Pause Carousel" : "Play Carousel"}
      >
        {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </button>
    </div>
  );
};

export default VideoCarousel;
