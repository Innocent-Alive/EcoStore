import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import ecoBanner from "../../assets/ecobanner.jpg";

function AuthLayout() {
  useEffect(() => {
    gsap.fromTo(
      ".auth-image-overlay",
      { opacity: 1, backgroundColor: "#f4e8da" },
      {
        opacity: 0,
        backgroundColor: "rgba(255, 255, 255, 0)",
        duration: 1,
        delay: 0.5,
      }
    );

    gsap.fromTo(
      ".auth-image",
      { x: 100, scale: 1.1 },
      { x: 0, scale: 1, duration: 1, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <div className="hidden lg:flex items-center justify-center bg-background w-1/2 h-[100vh] relative">
        {/* Color overlay */}
        <div className="absolute inset-0 auth-image-overlay" />
        <img
          src={ecoBanner}
          alt="banner image"
          className="object-cover h-full auth-image"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
