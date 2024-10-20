import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import { Footer } from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-background overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex bg-background flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
