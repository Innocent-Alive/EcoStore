// Spinner.js
import { FlowerSpinner } from "react-epic-spinners";

function Spinner({
  size = 80, // Size of the spinner
  color = "#838a60", // Green color for the spinner
  className = "",
  ...props
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-background z-50 ${className}`}
      {...props}
    >
      <FlowerSpinner size={size} color={color} />
    </div>
  );
}

export { Spinner };
