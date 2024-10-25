// Seeds.js
import React from "react";
import Slider from "react-slick";

const Seeds = () => {
  const seedMessage = {
    title: "Plant Today, Grow Tomorrow",
    description:
      "Every seed you plant is a promise to the future – a step toward creating a greener world. With care, patience, and hope, these seeds will grow into something beautiful, teaching us the joy of nurturing life from the soil up. Let’s make the world bloom, one seed at a time.",
    benefits: [
      "Start Small, Grow Big: From a single seed, nature creates endless possibilities.",
      "Bring Life to Spaces: Turn your garden, balcony, or backyard into a thriving oasis.",
      "A Journey of Patience: Gardening teaches us the art of waiting and appreciating growth.",
      "Reconnect with Nature: Planting helps us find peace in simple, meaningful actions.",
      "Shape a Sustainable Future: Every plant contributes to a healthier planet and biodiversity.",
    ],
  };

  const images = [
    "https://res.cloudinary.com/ddnp4px7u/image/upload/v1729820611/o6iuvgrhgrc8vybs8adm.jpg",
    "https://res.cloudinary.com/ddnp4px7u/image/upload/v1729820443/a2qgnvbhmjgbf6arlchm.jpg",
    "https://res.cloudinary.com/ddnp4px7u/image/upload/v1729820311/tnqcmyzunqygyx8ezjms.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="flex items-center flex-col md:flex-row gap-8 p-8 bg-background rounded-lg my-16">
      {/* Left Side: Seed Inspiration Message */}
      <div className="flex-1 relative">
        {/* Badge */}
        <div className="absolute top-0 left-0 bg-secondary text-background text-xs capitalize px-3 py-1 rounded-full">
          New
        </div>

        {/* Title and Content */}
        <h2 className="text-3xl font-elsie font-bold text-primary mt-10 md:mt-8">
          {seedMessage.title}
        </h2>
        <p className="mt-4 text-lg text-primary">{seedMessage.description}</p>
        <ul className="mt-4 list-disc list-inside space-y-2 hidden md:block">
          {seedMessage.benefits.map((benefit, index) => (
            <li key={index} className="text-base text-secondary">
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Carousel */}
      <div className="flex-1 max-w-md">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="p-2">
              <img
                src={image}
                alt={`Seed Showcase ${index + 1}`}
                className="w-full h-100 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Seeds;
