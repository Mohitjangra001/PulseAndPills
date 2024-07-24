import React, { useState, useEffect, useRef } from "react";
import LabBanner from "../Assets/labTest.png";
import { toast } from "react-toastify";
import LabCards from "../LabCards/LabCards";
import axios from "axios";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./Lab.css"; // Make sure to import the new CSS file

function Lab({ isLoggedIn }) {
  const [selectedTest, setSelectedTest] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
  });
  const [labTests, setLabTests] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const response = await axios.get("https://pilse-and-pills.el.r.appspot.com/api/lab-tests");
        setLabTests(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:", error);
      }
    };

    fetchLabTests();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user is logged in
    if (!isLoggedIn) {
      toast.error("Please log in to book a test.");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page
      }, 2000); // Delay for 2 seconds to allow the user to see the toast message
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to terms and conditions.");
      return;
    }
    if (formData.mobileNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (formData.pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!selectedTest) {
      toast.error("Please select a test.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated. Please log in.");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const userResponse = await axios.get(
        "https://pilse-and-pills.el.r.appspot.com/api/users/getUsers",
        config
      );
      const id = userResponse.data._id;

      const bookingData = {
        customer: id,
        tests: [selectedTest],
        patientName: formData.name,
        patientMobileNumber: formData.mobileNumber,
        pinCode: formData.pincode,
      };

      const response = await axios.post(
        "https://pilse-and-pills.el.r.appspot.com/api/bookings",
        bookingData
      );
      console.log("Booking created:", response.data);
      toast.success("Booking successful! Our agent will call you.");
      setShowMessage(true);

      setFormData({
        name: "",
        mobileNumber: "",
        pincode: "",
      });
      setSelectedTest("");
      setAgreeTerms(false);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 430, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full my-10">
      <div className="w-11/12 mx-auto flex flex-col sm:flex-row gap-6">
        <img
          src={LabBanner}
          alt="labBanner"
          className="w-full sm:w-[70%] object-contain"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full border-2 border-gray-200 p-4 rounded-lg shadow-md "
        >
          <h1 className="mb-4">Please fill in your details</h1>
          <label className="w-full ">
            <p className="text-base font-normal ">Name</p>
            <input
              className="border-2 rounded-md w-full p-2 h-10 mb-3"
              required
              type="text"
              name="name"
              placeholder="Enter Name"
              aria-label="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="w-full">
            <p className="text-base font-normal ">
              Mobile Number <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="border-2 rounded-md w-full p-2 h-10 mb-3"
              required
              type="number"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              aria-label="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              pattern="[0-9]{10}" // Enforces a 10-digit number pattern
            />
          </label>

          <label className="w-full">
            <p className="text-base font-normal ">
              PinCode <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="border-2 rounded-md w-full h-10 p-3 mb-3"
              required
              type="number" // Use type='text' to control the input length
              name="pincode"
              placeholder="Enter Pincode"
              aria-label="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              pattern="[0-9]{6}" // Enforces a 6-digit number pattern
              title="Please enter a valid 6-digit pincode."
            />
          </label>

          <div className="w-full flex gap-3 mb-3">
            <label className="w-1/2">
              <p className="text-base font-normal ">Choose Test</p>
              <select
                className="border-2 rounded-md w-full p-2 h-10"
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
              >
                <option value="">Select Test</option>
                {labTests.map((test, index) => (
                  <option key={index} value={test._id}>
                    {test.title}
                  </option> // Assuming test has _id property
                ))}
              </select>
            </label>
          </div>

          <label className="w-full flex flex-row gap-1 justify-center items-center mt-6">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={handleCheckboxChange}
            />
            <p className="text-base font-medium mb-1 leading-6 whitespace-nowrap">
              I agree to Pulse and Pills Terms and Conditions.{" "}
              <sup className="text-pink-200">*</sup>
            </p>
          </label>

          <button
            type="submit"
            className="h-11 w-full border-gray-200 border-2 rounded-lg bg-blue-900 text-white"
          >
            Book Now
          </button>
          {showMessage && (
            <div className="w-full mx-auto mt-2">
              <p className="text-base font-semibold text-green-600">
                Our agent will call you...
              </p>
            </div>
          )}
        </form>
      </div>

      <div className="w-full sm:h-[29rem] bg-blue-200 py-3 my-28">
        <div className="w-11/12 h-full mx-auto p-2 my-6">
          <h1 className="font-Logo_font font-semibold text-3xl">
            Popular Test
          </h1>
          <p>and many more tests and packages @THE BEST PRICES</p>
          <div className="relative">
            <button
              className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 w-10 h-10 rounded-full shadow-md"
              onClick={scrollLeft}
            >
              <span className="text-xl">
                <FaChevronLeft />
              </span>
            </button>
            <div
              className="flex flex-row gap-5 my-2 overflow-x-auto max-w-full h-full no-scrollbar"
              ref={scrollRef}
              style={{ scrollBehavior: "smooth" }}
            >
              {labTests.map((test, index) => (
                <div className="" key={index}>
                  <LabCards
                    title={test.title}
                    testLength={test.tests.length}
                    regularPrice={test.originalPrice}
                    sellingPrice={test.sellingPrice}
                    description={test.description}
                  />
                </div>
              ))}
            </div>
            <button
              className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 w-10 h-10 rounded-full shadow-md"
              onClick={scrollRight}
            >
              <span className="text-xl ">
                <FaChevronRight />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* third section */}

      {/* third part description */}
      <div className="w-full bg-slate-50 py-8">
        <div className="w-11/12 mx-auto mb-10 text-gray-600">
          <h2 className="text-2xl font-semibold">
            The Simple Way to Book Lab Tests Online with Pulse and Pills
          </h2>
          <p className="mt-4">
            Book your lab test diagnostics online and enjoy convenient doorstep
            sample collection services.
          </p>
          <h3 className="text-xl font-semibold mt-6">
            Simplified booking process for lab tests.
          </h3>
          <p className="mt-4">
            PharmEasy provides diagnostic testing, a highly sought-after
            service. Many individuals seek to schedule pathological tests.
            However, they often question the reliability of diagnostic centers
            for accurate results and the waiting time for testing queues. To
            alleviate these concerns, PharmEasy has established an expansive
            network of reputable pathological labs across India, including
            Thyrocare. This network grants access to a wide array of diagnostic
            facilities. Additionally, we offer convenient home sample collection
            services. Say goodbye to the uncertainty of booking diagnostic tests
            and adopt the hassle-free PharmEasy approach.
          </p>
          <h3 className="text-xl font-semibold mt-6">
            Lab tests conveniently brought to your door
          </h3>
          <p className="mt-4">
            To ease your anxieTo alleviate your concerns, PharmEasy provides
            doorstep sample collection services. Our technicians visit your home
            to collect samples, ensuring strict adherence to safety protocols.
            We use fresh collection kits and ice boxes meeting NABL guidelines
            to transport samples, preventing any contamination or disease
            spread. Your reports are conveniently delivered online, eliminating
            the need for you to visit the diagnostic lab for collection.
          </p>
          <h3 className="text-xl font-semibold mt-6">
            How can you schedule diagnostic tests online?
          </h3>
          <p className="mt-4">
            Booking a test with Pulse and Pills is straightforward:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>
              Visit{" "}
              <a
                href="https://PullsAndPills.in/Lab"
                className="text-blue-600 underline"
              >
                https://PullsAndPills.in/Lab
              </a>{" "}
              or click on Lab Tests on the PullsAndPills website.
            </li>
            <li>
              Alternatively, you can call our customer service team on
              9888660996 and they will make the booking for you.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mt-6">
            Looking to book a pathology test? Here’s how Pulse and Pills can
            assist you!
          </h3>
          <p className="mt-4">
            Online diagnostic tests operate with seamless efficiency. Upon
            booking your required pathology test at your chosen diagnostic
            center, you'll receive confirmation via your registered email and
            SMS. Our backend support team may also contact you to verify the
            booking. Following this, our skilled technician will visit your
            location at the designated time slot to collect your sample for
            processing at our advanced laboratories. Reports will be sent to you
            via SMS and will be accessible in your app/web account.
          </p>
          <h3 className="text-xl font-semibold mt-6">
            Why opt for Pulse and Pills to schedule lab tests?
          </h3>
          <p className="mt-4">
            We can give you reasons galore for choosing PharmEasy:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Safe home sample collection</li>
            <li>Up to 70% OFF</li>
            <li>Certified & 100% Automated labs</li>
            <li>Timely and accurate reports</li>
            <li>500+ tests and health packs to choose from</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Lab;
