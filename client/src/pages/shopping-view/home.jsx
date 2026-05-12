import VideoCarousel from "../../components/ui/videoCarousel";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  LeafIcon,
  RocketIcon,
  BadgeIcon,
  Upload,
  Lock,
  Database,
  ShirtIcon,
  Gem,
  UtensilsCrossedIcon,
  Sparkles,
  NotebookPen,
  HousePlus,
  BabyIcon,
  GiftIcon,
  Sprout,
  SmilePlus,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { getFeatureImages } from "@/store/common-slice";
import Stats from "@/components/ui/stats";
import PaypalReturnPage from "./paypal-return";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "@/components/ui/carouselArrow";
import TestimonialSection from "@/components/ui/testimonials";
import Seeds from "@/components/ui/seedsSection";

const categoriesWithIcon = [
  { id: "fashion", label: "Fashion", icon: ShirtIcon },
  { id: "cosmetics", label: "Cosmetics", icon: SmilePlus },
  { id: "accessories", label: "Accessories", icon: Gem },
  { id: "kitchen", label: "Kitchen", icon: UtensilsCrossedIcon },
  { id: "decor", label: "Decor", icon: Sparkles },
  { id: "stationary", label: "Stationary", icon: NotebookPen },
  { id: "home_essentials", label: "Home Essentials", icon: HousePlus },
  { id: "baby_products", label: "Baby Products", icon: BabyIcon },
  { id: "gifts", label: "Gifts", icon: GiftIcon },
  { id: "seeds", label: "Seeds", icon: Sprout },
];

const features = [
  { label: "Eco Friendly Goods", icon: LeafIcon },
  { label: "Eco Packaging", icon: GiftIcon },
  { label: "Fast Delivery", icon: RocketIcon },
  { label: "Certificated Products", icon: BadgeIcon },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const { user } = useSelector((state) => state.auth);

  const fashionSliderRef = useRef(null);
  const kitchenSliderRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: null,
    prevArrow: null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const fashionProducts = productList?.filter(
    (product) => product.category === "fashion"
  );
  const kitchenProducts = productList?.filter(
    (product) => product.category === "kitchen"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {featureImageList.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentSlide ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>
      <motion.section
        className="py-12 flex justify-center items-center px-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {features.map((categoryItem, index) => (
            <Card
              key={index}
              className="cursor-pointer shadow-sm transition-shadow border-[1px]"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <categoryItem.icon
                  className="w-12 h-12 mb-4 text-primary"
                  style={{ strokeWidth: 1 }}
                />
                <span className="font-semibold text-center">
                  {categoryItem.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
      <motion.section
        className="py-12 bg-background"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-8 font-elsie">
            Shop by category
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow border-[2px] rounded-2xl"
              >
                <CardContent className="flex flex-col items-center justify-center p-3 md:p-6 h-full">
                  <categoryItem.icon
                    className="w-7 h-7 md:w-12 md:h-12 mb-2 md:mb-4 text-secondary"
                    style={{ strokeWidth: 1.5 }}
                  />
                  <span className="font-bold text-primary text-[10px] md:text-base text-center leading-tight">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>
      {/* fashion Deals carousel */}
      <motion.section
        className="py-12 border-b-2 border-secondary border-dotted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary font-elsie">
            Fashion Deals
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => fashionSliderRef.current.slickPrev()}
              className="p-2 border-2 border-primary rounded-lg text-primary hover:border-secondary hover:text-secondary transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => fashionSliderRef.current.slickNext()}
              className="p-2 border-2 border-primary rounded-lg text-primary hover:border-secondary hover:text-secondary transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <Slider ref={fashionSliderRef} {...settings}>
          {fashionProducts?.map((product) => (
            <ShoppingProductTile
              key={product.id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </Slider>
      </motion.section>
      {/* Video Carousel of Deals  */}
      <VideoCarousel />
      <Seeds />
      {/* Kitchen Items carousel */}
      <motion.section
        className="py-12 border-b-2 border-secondary border-dotted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary font-elsie">
            Kitchen Deals
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => kitchenSliderRef.current.slickPrev()}
              className="p-2 border-2 border-primary rounded-lg text-primary hover:border-secondary hover:text-secondary transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => kitchenSliderRef.current.slickNext()}
              className="p-2 border-2 border-primary rounded-lg text-primary hover:border-secondary hover:text-secondary transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <Slider ref={kitchenSliderRef} {...settings}>
          {kitchenProducts?.map((productItem) => (
            <ShoppingProductTile
              key={productItem.id}
              product={productItem}
              handleGetProductDetails={handleGetProductDetails}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </Slider>
      </motion.section>
      {/* Android App Section */}
      <motion.section
        className="py-16 bg-secondary/10 flex flex-col lg:flex-row items-center px-6 lg:px-20 gap-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition duration-500"></div>
            <img 
              src="https://img.freepik.com/free-vector/hand-holding-smartphone-with-mobile-banking-app-screen_23-2148670125.jpg" 
              alt="EcoStore Mobile App" 
              className="relative w-full max-w-sm rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold font-elsie text-primary mb-6">
            Get the EcoStore App
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
            Enjoy a faster, more personalized shopping experience with our official Android app. Track orders, get exclusive notifications, and shop sustainably on the go.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button 
              onClick={() => navigate("/shop/download-app")}
              className="flex items-center justify-center gap-3 bg-primary text-background px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors duration-300 shadow-lg"
            >
              <Smartphone className="w-6 h-6" />
              Download Android App
            </button>
          </div>
        </div>
      </motion.section>

      {/* Company Statistics Count */}
      <Stats />
      {/* Testimonials section  */}
      <TestimonialSection />
      <motion.section
        className="py-12 bg-background flex flex-col lg:flex-row"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container my-16 flex flex-col items-center mx-auto px-4 text-center lg:text-left lg:w-1/2">
          <h2 className="text-3xl font-bold text-center font-elsie text-primary mb-4">
            Learn More About Us
          </h2>
          <p className="mb-4 text-center">
            Discover our mission and values in promoting eco-friendly products.
            At EcoStore, we are committed to providing sustainable solutions for
            a healthier planet.
          </p>
          <p className="mb-6 text-center">
            We believe in transparency and sustainability. Our products are
            sourced from eco-friendly materials, and every purchase supports
            environmental initiatives.
          </p>
          <ul role="list" className="mb-6 text-gray-600">
            <li className="flex gap-x-3 mb-2">
              <Upload className="h-5 w-5 flex-none text-primary" />
              <span>
                <strong className="font-semibold text-secondary">
                  Push for Sustainability:
                </strong>{" "}
                Every purchase contributes to eco-friendly projects.
              </span>
            </li>
            <li className="flex gap-x-3 mb-2">
              <Lock className="h-5 w-5 flex-none text-primary" />
              <span>
                <strong className="font-semibold text-secondary">
                  Secure Transactions:
                </strong>{" "}
                Your information is safe with us.
              </span>
            </li>
            <li className="flex gap-x-3 mb-2">
              <Database className="h-5 w-5 flex-none text-primary" />
              <span>
                <strong className="font-semibold text-secondary">
                  Transparent Practices:
                </strong>{" "}
                We believe in honesty and openness.
              </span>
            </li>
          </ul>
          <a href="/shop/about">
            <button className="px-4 py-2 bg-primary text-background rounded shadow hover:bg-secondary transition duration-200">
              About Us
            </button>
          </a>
        </div>
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <img
            src="https://www.thehorizonfoundation.org/wp-content/uploads/2018/08/iStock-697438336.jpg"
            alt="EcoStore Products"
            className="w-3/4 rounded-xl shadow-xl object-cover"
          />
        </div>
      </motion.section>
    </div>
  );
}

export default ShoppingHome;
