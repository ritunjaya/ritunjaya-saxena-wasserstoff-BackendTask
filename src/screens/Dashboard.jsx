import React, { useState } from "react";
import {BASE_URL} from "../constants/env"
import { FaCloudUploadAlt } from "react-icons/fa";
import AuthGuard from "../component/AuthGuard";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../component/dashboard/SideBar";

const Dashboard = () => {

  const [open, setOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    formData.append("userId", userId);

    try {
      const response = await fetch(`${BASE_URL}/user/insertImage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      setOpen(false);
      alert("Image uploaded successfully");

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  return (
    <AuthGuard>
      <div className="flex flex-row gap-28 ">
        <SideBar />
        <div className="pt-12 pl-32 drop-shadow-xl">
          <div className="pb-12">
            <h1 className="font-bold pb-2 border-b-2 border-black">Welcome to Vision AI</h1>
          </div>
          <div className="card " style={{ width: "28rem", height: "20rem" }}>
            <img
              src={selectedImage ? image : " https://tse1.mm.bing.net/th?id=OIP.4cmK9d36bF0F7-V-SaVPnAHaG_&pid=Api&P=0&h=180"}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1 className="font-bold pb-8">Image Annotation</h1>
              <p className=" font-bold pb-2"> Please upload 50 to 16000 px size photos only!! </p>
              <span>Check the result in review image status for annotation</span>
              <button className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={() => setOpen(!open)}
              >
                <FaCloudUploadAlt size={45} />
                <h3>Upload</h3>
              </button>
            </div>
            <dialog open={open} className="w-[500px] h-[500px]">
              <div className="flex flex-col gap-4 p-4">
                <input
                  type="file"
                  className="border border-gray-300"
                  onChange={handleImageChange}
                />
                <div className="flex flex-row gap-4">
                  {selectedImage && (
                    <img
                      src={image}
                      alt="selected"
                      className="w-50 h-50 object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-row gap-4 justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={ImageUpload}
                  >
                    Submit
                  </button>

                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
