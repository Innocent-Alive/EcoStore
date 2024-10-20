import React, { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { FaChevronUp } from "react-icons/fa";
import { gsap } from "gsap";

export const Footer = () => {
  const footerRef = useRef(null);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation on component load
  useEffect(() => {
    // Entrance animation when the page loads
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div ref={footerRef}>
      <div
        className="flex flex-col items-center bg-[#838a60] text-[#f4e8da] py-10 px-5"
        style={{
          borderTopRightRadius: "40px",
          borderTopLeftRadius: "40px",
          position: "relative",
        }}
      >
        {/* Back to Top Button */}
        <button
          onClick={handleBackToTop}
          className="absolute bottom-3 right-5 bg-secondary text-[#f4e8da] p-2 rounded-full shadow-lg hover:bg-[#a88450] flex items-center justify-center"
        >
          <FaChevronUp className="h-5 w-5" />
        </button>

        <div className="flex flex-col md:flex-row justify-around w-full max-w-screen-lg">
          {/* Logo Section */}
          <div className="text-center pb-5 md:pb-0 md:text-left">
            <img
              src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1727037000/logo_kseksa.png"
              alt="Eco Store Logo"
              className="h-24 w-24 mx-auto"
            />
            <p className="mt-3 text-sm">
              Eco-friendly place,
              <br />
              where sustainability
              <br />
              meets style!
            </p>
          </div>

          {/* Menu Section */}
          <div className="text-center md:text-left pb-5">
            <h4 className="font-bold text-lg pb-3">Menu</h4>
            <a href="/shop/listing" className="block text-sm hover:underline">
              Catalog
            </a>
            <a href="/shop/about" className="block text-sm hover:underline">
              About Us
            </a>
            <a href="#" className="block text-sm hover:underline">
              Partners
            </a>
          </div>

          {/* Catalog Section */}
          <div className="text-center md:text-left pb-5">
            <h4 className="font-bold text-lg pb-3">Catalog</h4>
            <a
              href="listing?category=fashion"
              className="block text-sm hover:underline"
            >
              Fashion
            </a>
            <a
              href="listing?category=cosmetics"
              className="block text-sm hover:underline"
            >
              Cosmetics
            </a>
            <a
              href="listing?category=accessories"
              className="block text-sm hover:underline"
            >
              Accessories
            </a>
            <a
              href="listing?category=kitchen"
              className="block text-sm hover:underline"
            >
              Kitchen
            </a>
            <a
              href="listing?category=decor"
              className="block text-sm hover:underline"
            >
              Decor
            </a>
            <a
              href="listing?category=home_essentials"
              className="block text-sm hover:underline"
            >
              Home Essentials
            </a>
            <a
              href="listing?category=baby_products"
              className="block text-sm hover:underline"
            >
              Baby Products
            </a>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left pb-5">
            <h4 className="font-bold text-lg pb-3">Contacts</h4>
            <a href="#" className="block text-sm hover:underline">
              Support
            </a>
            <a href="#" className="block text-sm hover:underline">
              FAQs
            </a>
            <a href="#" className="block text-sm hover:underline">
              Privacy Policy
            </a>
            <a
              href="/shop/terms-and-conditions"
              className="block text-sm hover:underline"
            >
              Terms and Condition
            </a>
          </div>

          {/* Social Media Section */}
          <div className="text-center md:text-left pb-5">
            <h4 className="font-bold text-lg pb-3">Social Media</h4>
            <a href="#" className="block text-sm hover:underline">
              Facebook
            </a>
            <a href="#" className="block text-sm hover:underline">
              Instagram
            </a>
            <a href="#" className="block text-sm hover:underline">
              Twitter
            </a>
            <a href="#" className="block text-sm hover:underline">
              Reddit
            </a>
          </div>
        </div>
      </div>

      <div className="text-center flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-[#838a60] text-[#f4e8da] border-t border-[#f4e8da]">
        <p className="text-sm">&copy; 2024 EcoStore. All rights reserved.</p>

        <p className="text-sm flex items-center gap-1 mt-2 md:mt-0">
          Created with
          <Heart size={16} fill="red" className="text-red-500 animate-pulse" />
          by{" "}
          <a
            href="#"
            className="hover:underline font-bold underline-offset-2 transition-all duration-300 hover:[text-shadow:0_0_2px_#ba9659] hover:[-webkit-text-stroke:0.05px_#ef4444]"
          >
            Abhay Kumar Das
          </a>
        </p>
      </div>
    </div>
  );
};
