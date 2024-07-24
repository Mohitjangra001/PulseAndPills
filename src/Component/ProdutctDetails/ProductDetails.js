import React, { useEffect, useState } from "react";
import Product1 from "../Assets/product_image/Product1.png";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ProductShort from "../Category/MoreToLove/ProductShort";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormatPrice from "../Helper/FormatPrice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [productRecommed, setProductRecommed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("PRODUCT DETAIL");
  const [mainImage, setMainImage] = useState(Product1);
  const { id } = useParams();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const quantity = 1;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`https://pilse-and-pills.el.r.appspot.com/api/products/${id}`);
        setProduct(response);
        if (response.images && response.images.length > 0) {
          setMainImage(response.images[0]);
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: otherProduct } = await axios.get('https://pilse-and-pills.el.r.appspot.com/api/products');
        setProductRecommed(otherProduct);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post(
        'https://pilse-and-pills.el.r.appspot.com/api/cart/add', // Replace with your backend URL
        { productId: id, quantity: quantity || 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Your order has been added to the cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Function to get a random subset of products
  const getRandomProducts = (items, limit) => {
    if (!Array.isArray(items)) {
      return [];
    }
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  };

  const randomProducts = getRandomProducts(productRecommed, 8); // Adjust the number 8 to limit the number of products shown

  // Content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "PRODUCT DETAIL":
        return <div className="text-[#090F47] opacity-55">{product.description}</div>;
      case "SAFETY ADVICE":
        return <div className="text-[#090F47] opacity-55">Safety advice content goes here.</div>;
      case "FAQ":
        return <div className="text-[#090F47] opacity-55">FAQ content goes here.</div>;
      case "PRODUCT SUBSTITUTES":
        return <div className="text-[#090F47] opacity-55">Product substitutes content goes here.</div>;
      case "CUSTOMERS ALSO BOUGHT":
        return <div className="text-[#090F47] opacity-55">Customers also bought content goes here.</div>;
      default:
        return null;
    }
  };

  const isEquipment = product.category === '666b2f95c66fdd3ebd54d892' || product.url?.includes('/Equipment');


  return (
    <div className="p-2 md:px-0 mx-auto w-full md:w-[87%] flex flex-col h-max my-10">
      <ToastContainer />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* heading */}
          <div className="flex flex-col gap-1 mb-4 p-2">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            {/* <p className="text-[#686363]">{product.category}</p> */}
          </div>
          {/* Product details */}
          <div className="w-full flex flex-col sm:flex-row h-max gap-4 mt-4">
            {/* image section */}
            <div className="w-[90%] mx-auto md:w-[50%]">
              <div className="h-[400px] md:h-[500px] bg-[#F8F8F8]">
                <img
                  src={mainImage}
                  alt="productImage"
                  className="w-full h-full shadow-md rounded-lg"
                />
              </div>
              <div className="flex gap-2 mt-4">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`productImage${index}`}
                      className="w-20 h-20 cursor-pointer border-2 border-gray-400 rounded-md"
                      onClick={() => setMainImage(image)}
                    />
                  ))
                ) : (
                  <img
                    src={Product1}
                    alt="productImageDefault"
                    className="w-20 h-20 cursor-pointer "
                  />
                )}
              </div>
            </div>
            {/* product ordering function */}
            <div className="md:pl-8 p-4 w-full md:w-[50%]">
              {/* price */}
              <div className="flex flex-row justify-between border-b-2">
                <div className="flex flex-row gap-4 items-baseline h-20">
                  <div className="text-xl text-[#090F47] opacity-75 line-through">
                    Rs <FormatPrice price={product.regularFees}/>
                  </div>
                  <div className="md:text-4xl text-2xl font-bold text-[#090F47] leading-10">
                    Rs.<FormatPrice price={product.offerPrice === 0 ? product.discountFees : product.offerPrice}/>
                  </div>
                  {product.offerPrice > 0 && (
                    <div className=" bg-green-300 text-black text-sm font-semibold px-2 py-1 rounded">
                      Offer Price
                    </div>
                  )}
                </div>
                
              </div>
              {/* package details */}
              <div className="mt-4">
                <div className="my-4">Weight: {product.weight}gm</div>
                <ul className="space-y-2 text-gray-400">
                  <li>*This product cannot be returned for a refund or exchange.</li>
                  <li>* Country of Origin: India</li>
                  <li>* Delivery charges if applicable will be applied at checkout</li>
                </ul>
              </div>
              {/* buy buttons */}
              <div className="mt-12 p-4 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <button
                  className={`w-80 md:w-52 h-14 rounded-lg text-xl font-semibold ${isEquipment ? 'bg-[#FFD700] hover:bg-[#FFC107]' : 'bg-[#7D8CFF] hover:bg-[#4B5DE7]'}`}
                  onClick={isEquipment ? () => toast.info('Please contact us for more details on rental equipment.') (addToCart) : addToCart}>
                  {isEquipment ? 'Enquire Now For Rental' : 'Add to bag'}

                  {!isEquipment && <ShoppingCartOutlinedIcon />}
                </button>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="mt-8 p-2 min-h-72">
            <div>
              <ul className="flex flex-row overflow-x-auto  gap-8 md:gap-12 items-start justify-start md:items-center md:justify-center leading-5 md:leading-8 text-lg md:text-xl border-t-2 border-b-2 border-gray-200 my-auto  md:my-6">
                <li onClick={() => setActiveTab("PRODUCT DETAIL")} className={`cursor-pointer inline-block ${activeTab === "PRODUCT DETAIL" ? "font-bold" : ""}`}>PRODUCT DETAIL</li>
                <li onClick={() => setActiveTab("SAFETY ADVICE")} className={`cursor-pointer ${activeTab === "SAFETY ADVICE" ? "font-bold" : ""}`}>SAFETY ADVICE</li>
                <li onClick={() => setActiveTab("FAQ")} className={`cursor-pointer ${activeTab === "FAQ" ? "font-bold" : ""}`}>FAQ</li>
                <li onClick={() => setActiveTab("PRODUCT SUBSTITUTES")} className={`cursor-pointer ${activeTab === "PRODUCT SUBSTITUTES" ? "font-bold" : ""}`}>PRODUCT SUBSTITUTES</li>
                <li onClick={() => setActiveTab("CUSTOMERS ALSO BOUGHT")} className={`cursor-pointer ${activeTab === "CUSTOMERS ALSO BOUGHT" ? "font-bold" : ""}`}>CUSTOMERS ALSO BOUGHT</li>
              </ul>
              <div className="p-2 flex flex-col gap-2">
                <h1 className="text-xl font-semibold">{activeTab}</h1>
                {renderTabContent()}
              </div>
            </div>
          </div>
          {/* more to love */}
          <div className="flex flex-wrap gap-4 my-10 mx-auto">
            <p className="text-3xl font-semibold">Product Substitutes</p>
            <div className="flex flex-wrap">
              {randomProducts.map((productRecommed) => (
                <ProductShort
                  key={productRecommed._id} // Assuming 'id' is a unique identifier for each product
                  id={productRecommed._id}
                  name={productRecommed.title}
                  LastPrice={productRecommed.regularFees}
                  photos={productRecommed.images}
                  firstPrice={productRecommed.discountFees}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
