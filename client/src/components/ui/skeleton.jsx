// Spinner.js
import { PropagateLoader } from "react-spinners";

function Spinner({
  size = 15, // Size of the loader (diameter of the dots)
  color = "#838a60", // Main color for the loader
  className = "",
  ...props
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-background z-50 ${className}`}
      {...props}
    >
      <PropagateLoader size={size} color={color} />
    </div>
  );
}

export { Spinner };
