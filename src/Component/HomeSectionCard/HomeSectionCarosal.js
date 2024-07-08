import React, { useEffect, useState } from 'react';
import HomeSectionCard from './HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';

function HomeSectionCarousel() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('https://pulsenpills.onrender.com/api/products');
        setProducts(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const responsive = {
    0: { items: 1 },
    450: { items: 2 },
    1024: { items: 3 },
    1524: { items: 4 },
  };

  const items = products.map((product) => {
    return (
      <HomeSectionCard
        key={product._id} // Add a unique key prop
        id={product._id} // Use _id instead of id
        name={product.title}
        price={product.offerPrice === 0 ? product.discountFees : product.offerPrice}
        offerPrice={product.offerPrice}
        photos={product.images}
        tag={product.tags}
        quantity={product.quantity}
      />
    );
  });

  return (
    <div className='relative px-4 lg:px-8 flex flex-row'>
      {loading ? (
        <div>Loading...</div> // Display loading indicator
      ) : (
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          autoPlay
          autoPlayInterval={3000}
          infinite
        />
      )}
    </div>
  );
}

export default HomeSectionCarousel;
