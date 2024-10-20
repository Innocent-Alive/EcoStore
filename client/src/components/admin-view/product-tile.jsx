import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Modal from "@/components/admin-view/confirmModal";
import { gsap } from "gsap";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);

  const handleDeleteConfirm = () => {
    handleDelete(product?._id);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <>
      <Card
        ref={cardRef}
        className="w-56 h-[400px] mx-auto flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        <div className="flex-grow flex flex-col">
          {/* Image Section */}
          <div className="relative h-40 overflow-hidden rounded-t-lg">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>

          {/* Card Content Section */}
          <CardContent className="flex-grow p-4 flex flex-col justify-between">
            <h2 className="text-lg font-bold text-primary mb-2 mt-2 line-clamp-2">
              {product?.title}
            </h2>

            {/* Price Section */}
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through text-gray-500" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold text-secondary">
                  ${product?.salePrice}
                </span>
              ) : null}
            </div>

            {/* Category and Brand Section */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm capitalize font-medium text-secondary">
                {product?.category}
              </span>
              <span className="text-sm capitalize font-medium text-secondary">
                {product?.brand}
              </span>
            </div>
          </CardContent>

          {/* Card Footer Section */}
          <CardFooter className="p-4 flex justify-between items-center">
            <Button
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
              className="flex-1 mr-2 bg-primary hover:bg-secondary text-background transition duration-300"
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-background transition duration-300"
            >
              Delete
            </Button>
          </CardFooter>
        </div>
      </Card>

      {/* Modal for delete confirmation */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold text-primary text-center">
          Confirm Delete
        </h2>
        <p className="mt-2 text-center font-semibold text-secondary">
          Are you sure you want to delete this product?
        </p>
        <div className="mt-4 flex justify-evenly gap-2">
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-secondary text-background hover:bg-primary transition-colors duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            className="bg-red-500 hover:bg-red-600 text-background transition-colors duration-300"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default AdminProductTile;
