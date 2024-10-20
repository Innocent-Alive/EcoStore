import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AdminOrdersView from "@/components/admin-view/orders";

function AdminOrders() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial animation for the entire container
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    });

    // Additional animation for child elements
    const childElements = containerRef.current.children;

    gsap.from(childElements, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={containerRef}>
      <AdminOrdersView />
    </div>
  );
}

export default AdminOrders;
