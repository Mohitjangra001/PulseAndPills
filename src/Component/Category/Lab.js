import React, { useEffect, useState } from 'react'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';


function Lab() {
  const [filter, setFilter] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://pulsenpills.onrender.com/api/products');
                console.log("Fetched data:", response); // Debugging: log fetched data
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // Category ID to filter by
    const specificCategoryID = '666b2fcec66fdd3ebd54d896';

    const filteredData = data.filter(product => {
        const matches = product.category && product.category._id === specificCategoryID;
        console.log(`Product ID: ${product._id}, Category: ${product.category ? product.category._id : 'N/A'}, Matches: ${matches}`); // Debugging: log each product's category and if it matches
        return matches;
    });

    console.log("Filtered data:", filteredData); // Debugging: log filtered data

    // If no products with the specific category ID, show all products
    const displayData = filteredData.length > 0 ? filteredData : data;



  return (
    <div className='md:px-0 m-auto md:w-[90%] w-full flex flex-col p-4 h-max mt-3 mb-16  '>
    <div className='flex flex-row justify-between items-cente'>
      <p>category/Lab</p>
      <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Filter</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filter}
        label="Filter"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Discount</MenuItem>
        <MenuItem value={20}>Relevance</MenuItem>
        <MenuItem value={30}>a-z</MenuItem>
      </Select>
    </FormControl>
      </div>
    </div>     
    <div className='flex flex-wrap gap-2 md:gap-3'>
                {
                    displayData.map(product => (
                        <HomeSectionCard
                            key={product._id}
                            id={product._id}
                            name={product.title}
                            price={product.discountFees}
                            photos={product.images}
                            tag={product.tags}
                        />
                    ))
                }
            </div>
    </div>
      )
}

export default Lab