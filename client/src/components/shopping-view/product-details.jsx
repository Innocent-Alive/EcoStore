import { Plus, Minus } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  const discountPercentage = Math.round(
    ((productDetails?.price - productDetails?.salePrice) /
      productDetails?.price) *
      100
  );

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + quantity > getTotalStock) {
          toast({
            title: `Only ${
              getTotalStock - getQuantity
            } quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: quantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setQuantity(1);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] max-h-screen overflow-auto border-dashed border-4 border-border">
        <div className="relative overflow-hidden">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={750}
            className="aspect-square w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-lg border-2"
          />
        </div>

        <div>
          <div>
            <h1 className="text-3xl text-primary font-extrabold">
              {productDetails?.title}
            </h1>
            {/* Rating Readonly */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={averageReview} readOnly={true} />
              </div>

              <span className="text-muted-foreground">
                ({averageReview.toFixed(2)})
              </span>
            </div>
            <p className="text-grey text-md mb-5 mt-4">
              {productDetails?.description}
            </p>
            <p className="text-secondary text-md mb-5 mt-4">
              Category:
              <span className="text-black capitalize ml-2">
                {productDetails?.category}
              </span>
            </p>
            <p className="text-primary  text-md mb-5 mt-4">
              Color:
              <span className="text-black capitalize ml-2">
                {productDetails?.brand}
              </span>
            </p>
          </div>

          {/* Pricing and Discount details */}
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl font-bold text-secondary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>

            {productDetails?.salePrice > 0 ? (
              <p className="text-3xl font-bold text-primary">
                ${productDetails?.salePrice}
              </p>
            ) : null}
            {productDetails?.salePrice > 0 && (
              <p className="text-lg font-semibold text-secondary">
                {discountPercentage}% OFF
              </p>
            )}
          </div>
          {/* Quantity Adjustment Section */}
          <div className="flex items-center justify-center sm:justify-start mb-4 py-3">
            <Button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity === 1}
              className={`p-1 mr-5 text-xl rounded-lg transition duration-200 ${
                quantity === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-secondary"
              }`}
            >
              <Minus size={15} />
            </Button>
            <span className="text-xl mr-5 font-bold text-background bg-secondary py-2 px-3 rounded-lg">
              {quantity}
            </span>
            <Button
              onClick={() => handleQuantityChange(1)}
              className="p-1 text-xl rounded-lg hover:bg-secondary"
            >
              <Plus size={15} />
            </Button>
          </div>
          <div className="mt-5 mb-5 ">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add To Bag
              </Button>
            )}
          </div>
        </div>

        {/* Writing a review */}
        <div className="pt-5 mt-2 flex-col flex gap-2 border-t ">
          <Label className="text-primary text-lg font-bold mb-1">
            Write a review
          </Label>
          <div className="flex gap-1">
            <StarRatingComponent
              rating={rating}
              handleRatingChange={handleRatingChange}
            />
          </div>
          <Input
            name="reviewMsg"
            value={reviewMsg}
            onChange={(event) => setReviewMsg(event.target.value)}
            placeholder="Write a review..."
            className="mb-3 mt-2"
          />
          <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
            Submit Review
          </Button>
        </div>
        {/* Reviews Section  */}
        <div className="max-h-[300px] overflow-auto mt-2 border-t pt-5 pl-1">
          <h2 className="text-xl font-bold mb-4 text-primary">Reviews</h2>
          <div className="grid gap-6">
            {reviews && reviews.length > 0 ? (
              reviews.map((reviewItem) => (
                <div className="flex gap-2" key={reviewItem._id}>
                  <Avatar className="w-10 h-10 border-2 text-secondary font-bold">
                    <AvatarFallback>
                      {reviewItem?.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-primary ml-2">
                        {reviewItem?.userName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarRatingComponent
                        rating={reviewItem?.reviewValue}
                        readOnly={true}
                      />
                    </div>
                    <p className="text-black capitalize ml-2">
                      {reviewItem.reviewMessage}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Reviews</h1>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
