import { FileIcon, ImageUp, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Spinner } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    // fdasgdudhudnhnidwj
    console.log(event.target.files);
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${
        isEditMode ? "opacity-60" : ""
      } border-2 border-dashed border-secondary rounded-lg text-secondary p-4 flex flex-col items-center`}
    >
      <Input
        id="image-upload"
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleImageFileChange}
        disabled={isEditMode && uploadedImageUrl}
      />

      {/* Show the uploaded image if it exists */}
      {uploadedImageUrl && !imageFile ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src={uploadedImageUrl}
            alt="Uploaded Image"
            className="h-32 w-auto mb-2 object-contain"
          />
          {!isEditMode && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove Image</span>
            </Button>
          )}
        </div>
      ) : !imageFile ? (
        <Label
          htmlFor="image-upload"
          className={`${
            isEditMode ? "cursor-not-allowed" : ""
          } flex flex-col items-center justify-center h-32 cursor-pointer`}
        >
          <ImageUp size={50} className="text-secondary opacity-60 mb-2" />
          <span className="capitalize underline-offset-2 hover:underline">
            Drag & drop or Click to upload image
          </span>
        </Label>
      ) : imageLoadingState ? (
        <Spinner size={20} color="#ba9659" />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileIcon className="w-6 text-primary mr-2 h-8" />
          </div>
          <p className="text-md text-primary font-medium">{imageFile.name}</p>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-transparent"
            onClick={handleRemoveImage}
          >
            <XIcon className="w-4 h-4 text-primary hover:text-secondary" />
            <span className="sr-only">Remove File</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
