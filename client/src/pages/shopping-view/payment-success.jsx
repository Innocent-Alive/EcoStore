import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa"; // Check circle icon from react-icons

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="p-10 shadow-lg rounded-lg max-w-md w-full bg-primary">
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-background text-6xl"
          >
            <FaCheckCircle />
          </motion.div>
        </div>
        <CardHeader className="p-0">
          <CardTitle className="text-3xl text-center text-background font-bold">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <motion.p
          className="text-center text-background mt-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Thank you for your purchase! Your transaction has been completed
          successfully.
        </motion.p>
        <Button
          className="mt-5 w-full bg-background text-primary hover:bg-secondary hover:text-background transition duration-300"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
