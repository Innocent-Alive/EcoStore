import { motion } from "framer-motion"; // Import Framer Motion
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { BadgeCheck, Search, SearchX } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { gsap } from "gsap";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const productRefs = useRef([]);
  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    gsap.from([searchInputRef.current, searchIconRef.current], {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
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
        quantity: 1,
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

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    gsap.from(productRefs.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [searchResults]);

  return (
    <motion.div
      className="container mx-auto md:px-6 px-4 py-8"
      initial={{ opacity: 0, y: 20 }} // Start state
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: 20 }} // Exit animation
      transition={{ duration: 0.6, ease: "easeInOut" }} // Control animation timing
    >
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            ref={searchInputRef}
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6 text-lg placeholder:text-primary input-class text-primary"
            placeholder="Search Products..."
          />
          <Search
            ref={searchIconRef}
            size={28}
            className="absolute right-8 lg:right-10 text-primary Search"
          />
        </div>
      </div>
      {!searchResults.length ? (
        <div className="flex justify-center h-[70vh] flex-col items-center lg:flex-row lg:items-start">
          <SearchX className="text-primary mr-4" size={50} />
          <h1 className="text-5xl font-bold text-primary text-center ">
            No result found!
          </h1>
        </div>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item, index) => (
          <div ref={(el) => (productRefs.current[index] = el)} key={item.id}>
            <ShoppingProductTile
              handleAddtoCart={handleAddtoCart}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
            />
          </div>
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </motion.div>
  );
}

export default SearchProducts;
