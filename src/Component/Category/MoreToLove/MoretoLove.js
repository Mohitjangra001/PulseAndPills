import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductShort from './ProductShort';

function MoretoLove() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('https://pilse-and-pills.el.r.appspot.com/api/products');
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const getRandomProducts = (items, limit) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  };

  const randomProducts = getRandomProducts(products, 8); // Adjust the number to limit the number of products shown

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className=' h-max flex flex-wrap mb-6 mx-auto'>
      {randomProducts.map((product, index) => {
        return (
          <ProductShort
            key={product._id || index} // Ensure the key is correctly referencing _id or fallback to index
            id={product._id}
            name={product.title}
            LastPrice={product.regularFees}
            photos={product.images}
            firstPrice={product.discountFees}
          />
        );
      })}
    </div>
  );
}

export default MoretoLove;
