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
      src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1729779467/tall-sage-banner_k6qsln.svg"
      alt="Video 2"
    />,
    <img
      src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1729782249/flower6_yxobtu.svg"
      alt="Video 6"
    />,
    <img
      src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1729779268/tall-organic-banner_qlzn7b.svg"
      alt="Video 1"
    />,
    <img
      src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1729781914/flower4_vfvjbo.svg"
      alt="Video 5"
    />,

    <img
      src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1729780144/flower_c7ak7k.svg"
      alt="Video 3"
    />,
    <img
      src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1729780756/flower2_kuehgf.svg"
      alt="Video 4"
    />,
  ];

  return (
    <div className="relative flex flex-col items-center border-primary rounded-md my-[4rem] overflow-hidden lg:mx-16 md:mx-7 mx-5">
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
        className=" sm:bottom-4 sm:right-4  bg-[#838a60] text-[#f4e8da] p-2 rounded-full focus:outline-none transition-colors duration-200 hover:bg-[#6d7451]"
        aria-label={isPlaying ? "Pause Carousel" : "Play Carousel"}
      >
        {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </button>
    </div>
  );
};

export default VideoCarousel;
