import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-8 shadow-xl border-2 border-background rounded-2xl bg-primary transition-transform transform hover:scale-[1.05] animate-fadeInUp">
        <CardHeader className="flex flex-col items-center justify-center mb-6">
          {/* Loader Icon */}
          <div className="relative">
            <Loader className="animate-spin text-background w-14 h-14 mb-4" />
            <span className="absolute top-2 left-2 w-10 h-10 rounded-full  opacity-20"></span>
          </div>
          <CardTitle className="text-2xl font-semibold text-center font-poppins text-background">
            Processing Payment...
          </CardTitle>
          <p className="text-center text-black mt-2">
            Please wait while we confirm your transaction.
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}

export default PaypalReturnPage;
