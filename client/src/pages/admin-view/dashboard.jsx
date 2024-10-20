// src/pages/admin-view/dashboard.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import Modal from "@/components/admin-view/confirmModal";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  const handleDeleteImage = () => {
    if (selectedImageId) {
      dispatch(deleteFeatureImage(selectedImageId))
        .unwrap()
        .then(() => {
          toast.success("Image deleted successfully!");
          dispatch(getFeatureImages());
        })
        .catch((error) => {
          toast.error("Error deleting image!");
          console.error("Error deleting image:", error);
        });
      setModalOpen(false);
    } else {
      console.error("Invalid imageId:", selectedImageId);
    }
  };

  const openModal = (imageId) => {
    setSelectedImageId(imageId);
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full"
        disabled={!imageFile || imageLoadingState}
      >
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => {
              return (
                <div className="relative" key={featureImgItem._id}>
                  <img
                    src={featureImgItem.image}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    alt="Feature"
                  />
                  <button
                    onClick={() => openModal(featureImgItem._id)}
                    className="absolute top-2 right-2"
                  >
                    <AiOutlineCloseCircle size={24} className="text-gray-900" />
                  </button>
                </div>
              );
            })
          : null}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-bold text-primary text-center">
          Confirm Delete
        </h2>
        <p className="mt-2 text-center font-semibold text-secondary">
          Are you sure you want to delete this image?
        </p>
        <div className="mt-4 flex justify-evenly gap-2">
          <Button
            onClick={() => setModalOpen(false)}
            className="bg-red-500 hover:bg-red-600 text-background transition-colors duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteImage}
            className="bg-primary text-background  hover:bg-secondary transition-colors duration-300"
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
