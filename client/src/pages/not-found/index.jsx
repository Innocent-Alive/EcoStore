import { Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <Sprout size={80} className="text-primary mb-6" />
      <h1 className="text-9xl font-bold text-primary font-elsie mb-2">404</h1>
      <h2 className="text-3xl font-bold text-primary mb-4">Lost in the Garden?</h2>
      <p className="text-secondary max-w-md mb-8">
        The page you're looking for doesn't exist. Let's get you back to the fresh air.
      </p>
      <Button 
        onClick={() => navigate("/shop/home")}
        className="bg-primary hover:bg-secondary text-background px-8 py-6 text-lg font-bold rounded-xl shadow-lg transition-all"
      >
        Return to Home
      </Button>
    </div>
  );
}

export default NotFound;
