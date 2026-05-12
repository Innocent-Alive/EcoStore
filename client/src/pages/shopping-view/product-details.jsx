import { Plus, Minus, ShoppingCart, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { fetchProductDetails, fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { Label } from "@/components/ui/label";
import StarRatingComponent from "@/components/common/star-rating";
import { useEffect, useState, useRef } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useParams, Link } from "react-router-dom";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { productDetails, productList, isLoading } = useSelector((state) => state.shopProducts);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetails) {
      dispatch(getReviews(productDetails?._id));
      dispatch(fetchAllFilteredProducts({ 
        filterParams: { category: [productDetails?.category] },
        sortParams: "price-lowtohigh"
      }));
    }
  }, [dispatch, productDetails]);

  const discountPercentage = Math.round(
    ((productDetails?.price - productDetails?.salePrice) /
      productDetails?.price) *
      100
  );

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock, passedQuantity = null) {
    let getCartItems = cartItems.items || [];
    const finalQuantity = passedQuantity || quantity;

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + finalQuantity > getTotalStock) {
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
        quantity: finalQuantity,
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

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  if (isLoading && !productDetails) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col gap-8 p-4 md:p-10 lg:px-20 container mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-secondary font-medium mb-2">
        <Link to="/shop/home" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/shop/listing" className="hover:text-primary transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary font-bold truncate max-w-[200px]">{productDetails?.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative overflow-hidden rounded-2xl shadow-xl border-dashed border-4 border-secondary/60 h-fit bg-white">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-auto aspect-square object-contain p-4 transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-center text-sm uppercase tracking-widest text-secondary font-bold mb-2">
              <span>{productDetails?.category}</span>
              <span>{productDetails?.brand}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-elsie leading-tight mb-4">
              {productDetails?.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRatingComponent rating={averageReview} readOnly={true} />
              <span className="text-secondary font-medium">({reviews?.length || 0} reviews)</span>
            </div>
            <p className="text-lg text-secondary/80 leading-relaxed mb-6">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-4">
                {productDetails?.salePrice > 0 ? (
                  <>
                    <span className="text-4xl font-bold text-primary">
                      ${productDetails?.salePrice}
                    </span>
                    <span className="text-2xl line-through text-secondary/50">
                      ${productDetails?.price}
                    </span>
                    <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    ${productDetails?.price}
                  </span>
                )}
             </div>
             {productDetails?.salePrice > 0 && (
               <span className="text-secondary font-semibold text-lg uppercase tracking-wider">
                 Limited Time Offer!
               </span>
             )}
          </div>

          <div className="flex items-center gap-6 py-4">
            <div className="flex items-center border-2 border-secondary/60 rounded-xl p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1}
                className="rounded-lg hover:bg-secondary/10"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center text-xl font-bold text-primary">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="rounded-lg hover:bg-secondary/10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {productDetails?.totalStock === 0 ? (
              <Button className="flex-1 py-7 text-xl opacity-60 cursor-not-allowed bg-gray-400 rounded-xl" disabled>
                Out Of Stock
              </Button>
            ) : (
              <Button
                className="flex-1 py-7 text-xl bg-primary hover:bg-secondary text-background rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-primary/20"
                onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
              >
                <ShoppingCart className="w-6 h-6" />
                Add To Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Reviews Section */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary font-elsie">Reviews & Ratings</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{averageReview.toFixed(1)}</span>
            <StarRatingComponent rating={averageReview} readOnly={true} />
            <span className="text-sm text-secondary">({reviews?.length || 0})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-1 bg-secondary/5 p-6 rounded-2xl border border-primary/10 h-fit">
            <h3 className="text-xl font-bold text-primary font-elsie mb-4">Write a review</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-bold text-secondary uppercase tracking-wider">Rating</Label>
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-bold text-secondary uppercase tracking-wider">Comment</Label>
                <textarea
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Your experience..."
                  className="w-full h-24 rounded-xl border border-secondary/20 focus:border-primary p-3 text-sm outline-none transition-all resize-none bg-background"
                />
              </div>
              <Button 
                onClick={handleAddReview} 
                disabled={reviewMsg.trim() === "" || rating === 0}
                className="bg-primary hover:bg-secondary text-background rounded-lg py-2 h-10 font-bold transition-all w-fit px-6"
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem?._id} className="p-4 rounded-xl border border-secondary/10 bg-white/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8 border">
                          <AvatarFallback className="bg-primary text-background font-bold text-xs">
                            {reviewItem?.userName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-primary text-sm">{reviewItem?.userName}</span>
                      </div>
                      <StarRatingComponent rating={reviewItem?.reviewValue} readOnly={true} />
                    </div>
                    <p className="text-secondary/80 text-sm italic ml-10">"{reviewItem.reviewMessage}"</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-secondary/5 rounded-xl border-2 border-dashed border-secondary/20">
                  <p className="text-secondary/50 italic">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      {/* Similar Products Section */}
      <div className="flex flex-col gap-8 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold text-primary font-elsie">Similar Products</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => sliderRef.current?.slickPrev()}
                className="p-2 border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-background transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => sliderRef.current?.slickNext()}
                className="p-2 border-2 border-primary rounded-lg text-primary hover:bg-primary hover:text-background transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="relative">
          {productList && productList.length > 0 ? (
            <Slider ref={sliderRef} {...sliderSettings}>
              {productList
                .filter((item) => item._id !== id)
                .map((productItem) => (
                  <div key={productItem._id} className="px-2">
                    <ShoppingProductTile
                      product={productItem}
                      handleGetProductDetails={() => {}} 
                      handleAddtoCart={(id, stock) => handleAddToCart(id, stock, 1)} 
                    />
                  </div>
                ))}
            </Slider>
          ) : (
            <p className="text-center text-secondary/50 italic py-10 border-2 border-dashed border-secondary/20 rounded-2xl">
              Finding similar products...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
