import React, { useState } from "react";
import LabBanner from '../Assets/labTest.png';
import { toast } from 'react-toastify';  // Assuming you are using react-toastify for notifications

function Lab() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    pincode: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowMessage(true);
    toast.success("Our agent will call you");
    // Reset the form data
    setFormData({
      name: '',
      mobileNumber: '',
      pincode: ''
    });
    setSelectedPackage("");
    setSelectedTest("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Demo data for packages and tests
  const demoPackages = ["Basic Package", "Advanced Package", "Premium Package"];
  const demoTests = ["Blood Test", "Urine Test", "X-Ray"];

  return (
    <div className="w-full my-10">
      {/* first part(photo and form) */}
      <div className="w-11/12 mx-auto flex flex-row gap-6">
        <img src={LabBanner} alt="labBanner" className="w-[70%] object-contain"/>
        <form onSubmit={handleSubmit} className="w-full border-2 border-gray-200 p-4 rounded-lg shadow-md ">
          <h1 className="mb-4">Please fill in your details</h1>
          <label className='w-full '>
            <p className='text-base font-normal '>
              Name
            </p>
            <input
              className='border-2 rounded-md w-full p-2 h-10 mb-3'
              required
              type='text'
              name='name'
              placeholder='Enter Name'
              aria-label='Name'
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className='w-full'>
            <p className='text-base font-normal '>
              Mobile Number <sup className='text-pink-200'>*</sup>
            </p>
            <input
              className='border-2 rounded-md w-full p-2 h-10 mb-3'
              required
              type='number'
              name='mobileNumber'
              placeholder='Enter Mobile Number'
              aria-label='Mobile Number'
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </label>
          
          <label className='w-full'>
            <p className='text-base font-normal '>
              PinCode <sup className='text-pink-200'>*</sup>
            </p>
            <input
              className='border-2 rounded-md w-full h-10 p-3 mb-3'
              required
              type='number'
              name='pincode'
              placeholder='Enter Pincode'
              aria-label='Pincode'
              value={formData.pincode}
              onChange={handleChange}
            />
          </label>

          <div className='w-full flex gap-3 mb-3'>
            <label className='w-1/2'>
              <p className='text-base font-normal'>
                Choose Package
              </p>
              <select
                className='border-2 rounded-md w-full p-2 h-10'
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="">Select Package</option>
                {demoPackages.map((pkg, index) => (
                  <option key={index} value={pkg}>{pkg}</option>
                ))}
              </select>
            </label>

            <label className='w-1/2'>
              <p className='text-base font-normal '>
                Choose Test
              </p>
              <select
                className='border-2 rounded-md w-full p-2 h-10'
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
              >
                <option value="">Select Test</option>
                {demoTests.map((test, index) => (
                  <option key={index} value={test}>{test}</option>
                ))}
              </select>
            </label>
          </div>

          <label className='w-full flex flex-row gap-1 justify-center items-center mt-6'>
            <input type='checkbox' required />
            <p className='text-base font-medium mb-1 leading-6 whitespace-nowrap'>
              I agree to Pulse and Pills Terms and Conditions. <sup className='text-pink-200'>*</sup>
            </p>
          </label>

          <button type="submit" className="h-11 w-full border-gray-200 border-2 rounded-lg bg-blue-900 text-white">
            Book Now
          </button>
          {showMessage && (
            <div className="w-full mx-auto mt-2">
              <p className="text-base font-semibold text-green-600">Our agent will call you...</p>
            </div>
          )}
        </form>
      </div>


      {/* second part (popular test) */}
      <div className="w-full h-max  bg-gray-200">
        <div className="w-11/12 mx-auto bg-white rounded-sm p-2 my-8">
          <h1>Popular Test</h1>
          <p>and many more tests and packages @ THE BEST PRICES</p>
        </div>
      </div>
    </div>
  );
}

export default Lab;
