export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "repeatPassword",
    label: "Repeat Password",
    placeholder: "Repeat your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "fashion", label: "Fashion" },
      { id: "cosmetics", label: "Cosmetics" },
      { id: "accessories", label: "Accessories" },
      { id: "kitchen", label: "Kitchen" },
      { id: "decor", label: "Decor" },
      { id: "stationary", label: "Stationary" },
      { id: "home_essentials", label: "Home Essentials" },
      { id: "baby_products", label: "Baby Products" },
      { id: "seeds", label: "seeds" },
    ],
  },
  {
    label: "Color",
    name: "brand",
    componentType: "select",
    options: [
      { id: "red", label: "Red" },
      { id: "green", label: "Green" },
      { id: "blue", label: "Blue" },
      { id: "yellow", label: "Yellow" },
      { id: "white", label: "White" },
      { id: "black", label: "Black" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "fashion",
    label: "Fashion",
    path: "/shop/listing",
  },
  {
    id: "aboutUS",
    label: "About Us",
    path: "/shop/about",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  fashion: "Fashion",
  cosmetics: "Cosmetics",
  accessories: "Accessories",
  kitchen: "Kitchen",
  decor: "Decor",
  stationary: "Stationary",
  home_essentials: "Home Essentials",
  baby_products: "Baby Products",
  seeds: "Seeds",
};

export const brandOptionsMap = {
  red: "Red",
  green: "Green",
  blue: "Blue",
  yellow: "Yellow",
  white: "White",
  black: "Black",
};

export const filterOptions = {
  category: [
    { id: "fashion", label: "Fashion" },
    { id: "cosmetics", label: "Cosmetics" },
    { id: "accessories", label: "Accessories" },
    { id: "kitchen", label: "Kitchen" },
    { id: "decor", label: "Decor" },
    { id: "stationary", label: "Stationary" },
    { id: "home_essentials", label: "Home Essentials" },
    { id: "baby_products", label: "Baby Products" },
    { id: "seeds", label: "Seeds" },
  ],

  brand: [
    { id: "red", label: "Red" },
    { id: "green", label: "Green" },
    { id: "blue", label: "Blue" },
    { id: "yellow", label: "Yellow" },
    { id: "white", label: "White" },
    { id: "black", label: "Black" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
