import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function Skeleton({
  width = "80px",
  height = "80px",
  borderRadius = "full",
  animationDuration = "1.8s",
  className = "",
  ...props
}) {
  const [isMounted, setIsMounted] = useState(false);

  // Ensures smooth mounting for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-background z-50",
        className
      )}
      {...props}
    >
      <div
        className={cn("relative bg-primary/20 rounded-full animate-ripple", {
          "w-20 h-20": width === "80px" && height === "80px",
        })}
        style={{ width, height }}
      >
        <div className="absolute inset-0 bg-primary/50 rounded-full animate-ping" />
      </div>
    </div>
  );
}

// CSS keyframes for the animation
const styles = `
@keyframes ripple {
  0% {
    transform: scale(0.9);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.9);
    opacity: 1;
  }
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Attach animations */
.animate-ripple {
  animation: ripple 1.8s infinite ease-in-out;
}

.animate-ping {
  animation: ping 2s infinite ease-out;
}`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerHTML = styles;
document.head.appendChild(styleSheet);

export { Skeleton };
