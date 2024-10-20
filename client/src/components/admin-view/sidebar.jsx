import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  Image,
} from "lucide-react";
import { Fragment, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "features",
    label: "Banners",
    path: "/admin/features",
    icon: <Image />,
  },
];

function MenuItems({ setOpen, activeMenuItem, setActiveMenuItem }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            setActiveMenuItem(menuItem.id);
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 font-semibold 
            ${
              activeMenuItem === menuItem.id
                ? "bg-primary text-background"
                : "text-primary hover:bg-muted hover:text-secondary"
            }`}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(
    adminSidebarMenuItems.find((item) => location.pathname.includes(item.path))
      ?.id || "dashboard"
  );

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <img
                  src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1727037064/logo1_b1yfjl.png"
                  alt="Ecommerce Logo"
                  className="h-16 w-22 object-cover"
                />
                {/* <h1 className="text-2xl text-primary font-extrabold">
                  Admin Panel
                </h1> */}
              </SheetTitle>
            </SheetHeader>
            <MenuItems
              setOpen={setOpen}
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
            />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex flex-col cursor-pointer gap-4"
        >
          <img
            src="https://res.cloudinary.com/ddnp4px7u/image/upload/v1727037064/logo1_b1yfjl.png"
            alt="Ecommerce Logo"
            className="h-20 w-26 self-center object-cover"
          />
          {/* <h1 className="text-2xl font-extrabold text-primary">Admin Panel</h1> */}
        </div>
        <MenuItems
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
