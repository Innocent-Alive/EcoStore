import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    // GSAP animation for the scale effect
    gsap.fromTo(
      ".login-container",
      { scale: 0 },
      { scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []); // Runs once when the component mounts

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          variant: "default",
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="login-container mx-auto w-full max-w-md space-y-6">
      <div className="flex flex-col items-center justify-center mb-4">
        <img
          src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1727037064/logo1_b1yfjl.png"
          alt="EcoStore Logo"
          className="h-16 md:h-24 w-auto object-contain"
        />
      </div>
      <div className="text-center">
        <h1 className="md:text-5xl text-3xl font-medium tracking-tight text-primary font-elsie">
          Login Your Account
        </h1>
        <p className="mt-2 text-secondary">
          Don't have an account
          <Link
            className="font-medium ml-1 text-primary underline md:no-underline hover:underline underline-offset-2"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonIcon={ArrowRight}
      />
      <div className="text-center mt-4">
        <p className="text-secondary text-sm">
          By logging in, you agree to our
          <Link
            className="font-medium ml-1 text-primary hover:underline underline-offset-2"
            to="/terms-and-conditions"
          >
            Terms & Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
