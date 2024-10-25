// Spinner.js
import { ClimbingBoxLoader } from "react-spinners";

function Spinner({
  size = 20, // Size of the loader
  color = "#838a60", // Main color for the loader
  className = "",
  ...props
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-background z-50 ${className}`}
      {...props}
    >
      <ClimbingBoxLoader size={size} color={color} />
    </div>
  );
}

export { Spinner };
