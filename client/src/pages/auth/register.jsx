import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap"; // Import GSAP
import { ArrowRight } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // GSAP animation for the scale effect
    gsap.fromTo(
      ".register-container",
      { scale: 0 },
      { scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []); // Runs once when the component mounts

  function onSubmit(event) {
    event.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&+\-])[A-Za-z\d@$!%*?&+\-]+$/;

    if (formData.password !== formData.repeatPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 16) {
      toast({
        title: "Password must be between 8 and 16 characters long",
        variant: "destructive",
      });
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast({
        title: "Password Must Contain The Letters, Numbers & Symbols",
        variant: "destructive",
      });
      return;
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="register-container mx-auto w-full max-w-md space-y-6">
      <div className="flex flex-col items-center justify-center mb-4">
        <img
          src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1727037064/logo1_b1yfjl.png"
          alt="EcoStore Logo"
          className="h-16 md:h-24 w-auto object-contain"
        />
      </div>
      <div className="text-center">
        <h1 className="md:text-5xl text-3xl font-medium tracking-tight text-primary font-elsie">
          Create New Account
        </h1>
        <p className="mt-2 text-secondary">
          Already have an account
          <Link
            className="font-medium ml-1 text-primary underline md:no-underline hover:underline underline-offset-2"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonIcon={ArrowRight}
      />
      <div className="text-center mt-4">
        <p className="text-secondary text-sm">
          By signing up, you agree to our
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

export default AuthRegister;
