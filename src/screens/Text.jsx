import React, { useState } from 'react';

function Text() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const ImageUpload = async() => {
        if(!selectedImage){
            alert("image")
        }

        const formData = new FormData();
        formData.append("image",selectedImage);

        const uploaded = fetch("https://wasserstoff-backendtask-35f0.onrender.com/user/insertImage",{
            method:"POST",
            body:formData
        });
        console.log(uploaded)
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h2>Preview:</h2>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <button  onClick={ImageUpload}>Submit</button>
    </div>
  );
}

export default Text;
