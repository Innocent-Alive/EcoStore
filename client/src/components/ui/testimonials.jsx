import React, { useRef, useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { gsap } from "gsap";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Eco Enthusiast",
    avatar: "https://i.pravatar.cc/100?img=1",
    text: "The Neem wood toothbrush from EcoStore is amazing! It feels great in hand, and I'm happy to switch from plastic to this sustainable option. 🌿",
  },
  {
    name: "Mark Spencer",
    role: "Sustainable Living Advocate",
    avatar: "https://i.pravatar.cc/100?img=2",
    text: "I love EcoStore's reusable bags! They're stylish and durable, making every shopping trip eco-friendly. No more plastic bags for me! ♻️",
  },
  {
    name: "Sophia Williams",
    role: "Travel Blogger",
    avatar: "https://i.pravatar.cc/100?img=3",
    text: "The bamboo cutlery set is perfect for travel! It's lightweight, convenient, and helps me reduce my plastic waste wherever I go. 🎋",
  },
  {
    name: "James Smith",
    role: "Environmentalist",
    avatar: "https://i.pravatar.cc/100?img=4",
    text: "EcoStore’s biodegradable phone case is fantastic! I feel good about reducing my impact on the planet. 📱🌍",
  },
  {
    name: "Emily Clark",
    role: "Health Advocate",
    avatar: "https://i.pravatar.cc/100?img=5",
    text: "The organic cotton tote bags are not only eco-friendly but also stylish! I take mine everywhere. 👜",
  },
];

const responsive = {
  0: { items: 1 },
};

function TestimonialCarousel() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle active index update when the component mounts
  useEffect(() => {
    setActiveIndex(0); // Ensure the first slide is set as active
  }, []);

  const animateSlide = (event) => {
    const activeSlide = event.item;
    setActiveIndex(activeSlide); // Update active index

    const element =
      carouselRef.current.querySelectorAll(".testimonial-card")[activeSlide];
    gsap.fromTo(
      element,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
  };

  const items = testimonials.map((testimonial, index) => (
    <div
      key={index}
      className="testimonial-card flex flex-col md:flex-row items-center bg-background rounded-lg border-2 p-6 space-x-6 mx-2"
    >
      {/* Left Side: Avatar + User Info */}
      <div className="flex items-center space-x-4 my-6">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name}'s avatar`}
          className="w-20 h-20 rounded-full border-4 border-primary object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-primary">
            {testimonial.name}
          </h3>
          <p className="text-sm italic text-secondary">{testimonial.role}</p>
        </div>
      </div>

      {/* Right Side: Testimonial Text */}
      <div className="flex-1">
        <p className="text-primary text-lg text-center">"{testimonial.text}"</p>
      </div>
    </div>
  ));

  return (
    <div className="w-full my-16 max-w-6xl mx-auto relative">
      <h1 className="text-center font-elsie text-3xl font-bold text-primary mb-12">
        What Testimonials Say
      </h1>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        disableDotsControls
        autoPlayInterval={3000}
        animationDuration={1000}
        disableButtonsControls
        responsive={responsive}
        items={items}
        onSlideChanged={animateSlide}
        ref={carouselRef}
      />
      {/* Custom Prev Button */}
      <button
        className="absolute -left-1 top-1/2 transform translate-y-1/2 bg-primary text-background p-2 rounded-full shadow-lg z-10"
        onClick={() => carouselRef.current.slidePrev()}
      >
        &lt;
      </button>
      {/* Custom Next Button */}
      <button
        className="absolute -right-1 top-1/2 transform translate-y-1/2 bg-primary text-background p-2 rounded-full shadow-lg z-10"
        onClick={() => carouselRef.current.slideNext()}
      >
        &gt;
      </button>
      {/* Custom Indicator Styles */}
      <div className="custom-indicators flex justify-center mt-2">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`indicator-line ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => {
              carouselRef.current.slideTo(index);
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
      <style jsx>{`
        .alice-carousel__prev-btn,
        .alice-carousel__next-btn {
          display: none; /* Hide default buttons */
        }
        .custom-indicators {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .indicator-line {
          background: #ba9659; /* Color for the inactive lines */
          height: 2.5px;
          width: 20px;
          margin: 0 5px;
          border-radius: 5px;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.3s, transform 0.3s;
        }
        .indicator-line.active {
          opacity: 1; /* Active indicator color */
          transform: scale(1.3); /* Scale up active indicator */
        }
      `}</style>
    </div>
  );
}

export default TestimonialCarousel;
