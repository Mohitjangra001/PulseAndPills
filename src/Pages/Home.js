import React, { useEffect, useState } from "react";
import landing from "../Component/Assets/landing img.png";
import HomeSectionCarosal from "../Component/HomeSectionCard/HomeSectionCarosal";
import OffersCards from "../Component/HomeSectionCard/OffersCards";
import offer1 from "../Component/Assets/Medicine/offer1.png";
import offer2 from "../Component/Assets/Medicine/Offer2.png";
import lastBanner from "../Component/Assets/Medicine/lastBanner.png";
import MoretoLove from "../Component/Category/MoreToLove/MoretoLove";
import callBanner from "../Component/Assets/callus.mp4"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOffersAndProducts = async () => {
      setLoading(true);
      try {
        // Fetch offers
        const { data: offersResponse } = await axios.get("http://localhost:4000/api/offers");
        setOffers(offersResponse);

        // Extract product IDs from offers
        const productIds = offersResponse.flatMap(offer => offer.products.map(product => product._id));
        const uniqueProductIds = [...new Set(productIds)];

        // Fetch products based on IDs
        const productRequests = uniqueProductIds.map(id =>
          axios.get(`http://localhost:4000/api/products/${id}`)
            .catch(error => {
              console.error(`Error fetching product ${id}:`, error.response ? error.response.data : error.message);
              return { data: null }; // Return a null response to prevent breaking the Promise.all
            })
        );

        // Wait for all requests to complete
        const productResponses = await Promise.all(productRequests);

        // Filter out any null responses
        const productsData = productResponses
          .map(response => response.data)
          .filter(product => product !== null);

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffersAndProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      // Replace with your backend URL
      const response = await axios.post(
        'http://localhost:4000/api/cart/add',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Your order has been added to the cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full mb-16">
      <ToastContainer />
      <div>
        <img
          src={landing}
          alt="landing"
          className="w-[90%] h-48 sm:h-full sm:w-11/12 object-cover mt-6 mb-8 m-auto rounded-3xl"
        />
      </div>

      <div className="w-[87%] sm:w-[82%] m-auto">
        <div className="w-full my-4">
          <div className="sm:text-center font-bold mt-6 mb-4 sm:text-2xl text-xl flex flex-row sm:flex-none justify-between items-center">
            <div className="sm:mx-auto">Best Selling Product</div>
          </div>
          <div className="my-4 w-full hidden sm:block">
            <HomeSectionCarosal />
          </div>
          <div className="sm:hidden">
            <HomeSectionCarosal />
          </div>
        </div>

        {offers.map(offer => (
          <div key={offer._id} className="mt-10">
            <div className="flex flex-row w-full h-16 gap-2 sm:gap-4 items-center justify-start sm:justify-center">
              <div className="text-[#184363] text-xl sm:text-2xl font-bold">
                {offer.title}
              </div>
              <CountdownTimer endDate={offer.endDate} />
            </div>
            <div className="overflow-x-auto mt-4 flex gap-4 sm:flex-row flex-row pb-4">
              {products
                .filter(product => offer.products.map(p => p._id).includes(product._id))
                .map(product => (
                  <OffersCards
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    price={product.offerPrice === 0 ? product.discountFees : product.offerPrice}
                    image={product.images}
                    description={product.description}
                    regularPrice ={product.regularFees}
                    addToCart={() => addToCart(product._id)} // Pass addToCart function here
                  />
                ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col mt-14 mb-6 sm:h-96">
          <div className="text-center w-full h-8 font-bold text-3xl">
            Special offers
          </div>
          <div className="flex sm:flex-row gap-2 my-6">
            <img src={offer1} alt="offer1Img" className="hidden  xl:block" />
            <img src={offer2} alt="offer2Img" />
          </div>
        </div>

        <div className=""> 
          <video src={callBanner} autoPlay loop="true" className="w-full my-4 mx-auto rounded-lg"/>
        </div>

        <div className="mt-6 mb-12">
          <div className="block">
            <HomeSectionCarosal />
          </div>
        </div>

        <div className="w-full mt-16 xl:h-96">
          <img
            src={lastBanner}
            alt="lastBanner"
            className="object-cover mt-6 rounded-3xl"
          />
        </div>

        <div className="flex flex-col gap-6 w-full m-auto items-center mb-12">
          <div className="text-2xl sm:text-3xl text-center font-bold">
            More to love
          </div>
          <div className="">
            <MoretoLove />
          </div>
        </div>
      </div>
    </div>
  );
}

const CountdownTimer = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex flex-row gap-3 h-full">
      <div className="w-12 h-full bg-[#15A9E3] flex flex-col justify-center items-center rounded-lg">
        <div className="text-xl font-bold">{timeLeft.days}</div>
        <div>Days</div>
      </div>
      <div className="w-12 h-full bg-[#15A9E3] flex flex-col justify-center items-center rounded-lg">
        <div className="text-xl font-bold">{timeLeft.hours}</div>
        <div>Hours</div>
      </div>
      <div className="w-12 h-full bg-[#15A9E3] flex flex-col justify-center items-center rounded-lg">
        <div className="text-xl font-bold">{timeLeft.minutes}</div>
        <div>Min</div>
      </div>
      <div className="w-12 h-full bg-[#15A9E3] flex flex-col justify-center items-center rounded-lg">
        <div className="text-xl font-bold">{timeLeft.seconds}</div>
        <div>Sec</div>
      </div>
    </div>
  );
};

export default Home;
