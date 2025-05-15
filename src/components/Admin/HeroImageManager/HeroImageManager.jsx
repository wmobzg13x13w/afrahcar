import React, { useState, useEffect } from "react";
import axios from "axios";

const HeroImageManager = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCurrentImage();
  }, []);

  const fetchCurrentImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}settings/hero-image`
      );
      setCurrentImage(response.data.imageUrl);
    } catch (err) {
      setError("Aucune image est trouvée!");
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Choisir une image");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}settings/hero-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Image d'accueil mise à jour avec succès");
      fetchCurrentImage();
      setSelectedFile(null);
      setPreviewUrl("");
    } catch (err) {
      setError("Image d'accueil mise à jour est échouée");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>Image d'accueil</h2>

      {/* Current Image Display */}
      {currentImage && (
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Current Hero Image</h3>
          <img
            src={`${process.env.REACT_APP_BASE_URL}uploads/${currentImage}`}
            alt='Current hero'
            className='w-full max-w-2xl rounded-lg shadow-md'
          />
        </div>
      )}

      {/* Image Upload Form */}
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Choisir Image d'accueil
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileSelect}
            className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-darkBlue file:text-white hover:file:bg-darkBlue-light'
          />
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div className='mt-4'>
            <h3 className='text-lg font-semibold mb-2'>Preview</h3>
            <img
              src={previewUrl}
              alt='Preview'
              className='w-full max-w-2xl rounded-lg shadow-md'
            />
          </div>
        )}

        {/* Error and Success Messages */}
        {error && <div className='text-red-500 mt-2'>{error}</div>}
        {success && <div className='text-green-500 mt-2'>{success}</div>}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className={`mt-4 px-4 py-2 rounded-md text-white ${
            loading || !selectedFile
              ? "bg-gray-400"
              : "bg-darkBlue hover:bg-darkBlue-light"
          }`}>
          {loading ? "Chargement..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
};

export default HeroImageManager;
