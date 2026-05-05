import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { gsap } from "gsap";
import { ShoppingCart, Star } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const calculateDiscount = (price, salePrice) => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          delay: Math.random() * 0.5,
        }
      );
    }
  }, []);

  const handleCardHoverEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.07,
      duration: 0.1,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      y: -8,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(cardRef.current, {
      boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2)",
      duration: 0.3,
    });
  };

  const handleCardHoverLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.1,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(cardRef.current, {
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power1.out",
    });
  };

  return (
    <Card
      ref={cardRef}
      className="w-full max-w-[15rem] mx-auto border-2 border-primary rounded-lg shadow-md transition-all duration-300 hover:border-secondary cursor-pointer"
      onMouseEnter={handleCardHoverEnter}
      onMouseLeave={handleCardHoverLeave}
      onClick={() => navigate(`/shop/product/${product?._id}`)}
    >
      <div className="flex flex-col justify-between">
        <div
          className="relative group overflow-hidden"
        >
          <img
            ref={imageRef}
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] md:h-[300px] object-cover rounded-t-lg transition-transform duration-300"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-gray-600 hover:bg-gray-500 text-background">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <>
              <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600 text-background">
                {`Only ${product?.totalStock} left`}
              </Badge>
              <div className="absolute top-2 right-2 bg-green-500 text-background text-xs font-bold py-1 px-2 rounded-full">
                {`-${calculateDiscount(product?.price, product?.salePrice)}%`}
              </div>
            </>
          ) : product?.salePrice > 0 ? (
            <>
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-background">
                Sale
              </Badge>
              <div className="absolute top-2 right-2 bg-green-600 text-background text-xs font-bold py-1 px-2 rounded-full">
                {`-${calculateDiscount(product?.price, product?.salePrice)}%`}
              </div>
            </>
          ) : null}
        </div>
        <CardContent
          className="p-3 flex flex-col gap-1"
          ref={textRef} // Ref for text animation
        >
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-secondary font-bold">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          <h2 className="text-lg text-primary font-bold font-elsie leading-tight line-clamp-2 min-h-[3rem] overflow-hidden">
            {product?.title}
          </h2>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 fill-[#ba9659] text-[#ba9659]" />
              ))}
            </div>
            <span className="text-xs text-secondary font-medium ml-1">(12)</span>
          </div>

          <div className="mt-1">
            {product?.salePrice > 0 ? (
              <div className="flex flex-col">
                <span className="text-sm line-through text-secondary/60 -mb-1">
                  ${product?.price}
                </span>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary ">
                    ${product?.salePrice}
                  </span>
                  <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded">
                    SAVE ${Math.round(product?.price - product?.salePrice)}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary font-elsie">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between">
          {product?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed" disabled>
              Out Of Stock
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddtoCart(product?._id, product?.totalStock);
              }}
              className="w-full text-background bg-primary hover:bg-secondary flex items-center gap-2 transition-colors duration-300 py-4"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-lg">Add To Cart</span>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
