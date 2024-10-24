import { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { gsap } from "gsap";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
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
      className="w-full max-w-[15rem] mx-auto border-2 border-primary rounded-lg shadow-md transition-all duration-300 hover:border-secondary"
      onMouseEnter={handleCardHoverEnter}
      onMouseLeave={handleCardHoverLeave}
    >
      <div className="flex flex-col justify-between">
        <div
          className="relative cursor-pointer group overflow-hidden"
          onClick={() => handleGetProductDetails(product?._id)}
        >
          <img
            ref={imageRef}
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] md:h-[300px] object-cover rounded-t-lg transition-transform duration-300"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-gray-600 hover:bg-gray-500 text-white">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <>
              <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                {`Only ${product?.totalStock} items left`}
              </Badge>
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                {`-${calculateDiscount(product?.price, product?.salePrice)}%`}
              </div>
            </>
          ) : product?.salePrice > 0 ? (
            <>
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white">
                Sale
              </Badge>
              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                {`-${calculateDiscount(product?.price, product?.salePrice)}%`}
              </div>
            </>
          ) : null}
        </div>
        <CardContent
          className="p-3 flex flex-col"
          ref={textRef} // Ref for text animation
        >
          <h2 className="text-md text-primary font-semibold h-12 mb-2 line-clamp-2">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center text-sm text-secondary mb-3">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold mb-2">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-secondary text-md"
                  : "text-primary"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-primary font-bold">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          {product?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed" disabled>
              Out Of Stock
            </Button>
          ) : (
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full text-background bg-primary hover:bg-secondary transition-colors duration-300"
            >
              Add To Bag
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
