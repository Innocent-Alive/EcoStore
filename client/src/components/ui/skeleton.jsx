// Spinner.js
import { PropagateLoader } from "react-spinners";

function Spinner({ size = 10, color = "#838a60", className = "", ...props }) {
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
