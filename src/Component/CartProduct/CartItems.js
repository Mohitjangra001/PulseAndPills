import React from "react";
import { RxCross2 } from "react-icons/rx";
import FormatPrice from "../Helper/FormatPrice";
import axios from "axios";

function CartItems({ product, onRemove, onQuantityChange }) {
  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        await axios.delete(`https://pulsenpills.onrender.com/api/cart/delete/${product.productId._id}`, config);
        onRemove(product.productId._id);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 0) {
      onQuantityChange(product.productId._id, newQuantity);
    }
  };

  const price = product.productId.offerPrice === 0 ? product.productId.discountFees : product.productId.offerPrice;

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col gap-10 border-b-2 pb-6 justify-between">
        {/* left side */}
        <div className="md:w-2/5 w-full">
          <img className="rounded-lg h-[18rem] md:w-full w-full object-cover" src={product.productId.image[0].url} alt={product.productId.name} />
        </div>
        {/* right side */}
        <div className="md:w-3/5 w-full flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <div className="font-semibold md:text-xl text-lg">{product.productId.name}</div>
            <RxCross2 onClick={deleteProduct} className="text-xl" />
          </div>
          <p className="font-bold md:text-lg text-base text-[#f02e2e]">{FormatPrice(price * product.quantity)}</p>
          <div className="flex flex-row gap-2">
            <label htmlFor="quantity" className="font-semibold text-lg">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="w-16 h-8 border-2 border-gray-300 rounded-md text-center"
              value={product.quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
