import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = 'http://localhost:4000/api';

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  // Handle form submission and upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('prescription', file);
        
        const config = {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        };
        // Upload prescription to backend
        const response = await axios.post(`${BASE_URL}/prescription/upload`, formData, config);

        if (response.data.success) {
          toast.success('Prescription uploaded successfully!');
          navigate('/');
        } else {
          toast.error('Failed to upload prescription');
        }
      } catch (error) {
        toast.error('An error occurred while uploading the prescription');
        console.error('Upload Error:', error);
      }
    } else {
      toast.error('Please select a file to upload');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Upload Prescription</h2>
        <p>You can only upload your Prescription and we will assist you</p>
        <form onSubmit={handleUpload}>
          {/* File input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 border border-gray-300 p-2 w-full rounded"
          />

          {/* Preview of selected image */}
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mb-4 rounded-lg shadow-md max-w-full h-auto" />
          )}

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-red-500 text-white py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionUpload;
