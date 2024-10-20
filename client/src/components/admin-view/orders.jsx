import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetailsForAdmin(getId));
  };

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="overflow-visible">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Desktop Table View */}
          <Table className="w-full hidden md:table">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList?.length > 0 &&
                orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem._id}</TableCell>
                    <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-blue-600"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-red-600"
                            : orderItem.orderStatus === "pending"
                            ? "bg-yellow-600"
                            : orderItem.orderStatus === "delivered"
                            ? "bg-green-600"
                            : "bg-black"
                        } text-white`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Mobile View: Stacked Cards */}
          <div className="md:hidden space-y-4">
            {orderList?.length > 0 &&
              orderList.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="p-4 border rounded-lg shadow-sm bg-background"
                >
                  <div className="flex justify-between flex-col sm:flex-row">
                    <span className="font-medium text-primary">Order ID:</span>
                    <span>{orderItem._id}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-medium text-primary">
                      Order Date:
                    </span>
                    <span>{orderItem.orderDate.split("T")[0]}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-medium text-primary">Status:</span>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === "confirmed"
                          ? "bg-blue-600"
                          : orderItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : orderItem.orderStatus === "pending"
                          ? "bg-yellow-600"
                          : orderItem.orderStatus === "delivered"
                          ? "bg-green-600"
                          : "bg-black"
                      } text-white`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-medium text-primary">Total:</span>
                    <span>${orderItem.totalAmount}</span>
                  </div>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => handleFetchOrderDetails(orderItem._id)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
