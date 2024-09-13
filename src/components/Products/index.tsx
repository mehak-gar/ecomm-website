/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';



import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Rating from '@mui/material/Rating';
import { AppDispatch } from '@/store';
import { getAllProduct } from '@/store/Products';
import { addToCart} from '@/store/cart';
import { formatPrice } from '@/utils/helper';
import LazyLoadingImage from '@/utils/LazyLoadingImage';


const Products = () => {
  const dispatch=useDispatch<AppDispatch>()
  const product=useSelector((state:any)=>state?.products?.products)
  //  console.log(product)
 
 const[limit,setLimit]=useState<any>(10)

  useEffect(()=>{
dispatch(getAllProduct(limit))

  },[dispatch, limit])
 
  const [quantity, setQuantity] = useState(1);

const handleInfiniteScroll=async()=>{

  try {
   if( window.innerHeight+document.documentElement.scrollTop+1>=document.documentElement.scrollHeight)
    {
      
      setLimit((prev: any) => Math.min(prev + 50, product?.total || prev + 50));
  
    }
  } 
  catch (error) {
    console.log(error)
  }
}
useEffect(() => {
  window.addEventListener("scroll", handleInfiniteScroll);

  // Clean up the event listener on component unmount
  return () => {
    window.removeEventListener("scroll", handleInfiniteScroll);
  };
}, []); // Empty dependency array ensures the effect runs only once on component mount
  const addToCartHandler = (product:any) => {
    let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
    let totalPrice = quantity * discountedPrice;

    dispatch(addToCart({...product, quantity: quantity, totalPrice, discountedPrice}));
   
  }



 

  return (
    <>
    <div className='container-fluid'>
      <div className='row'    >
      { product?.products?.map((data:any)=>{
           let DiscountedPrice = (data?.price) - (data?.price * (data?.discountPercentage / 100));
        return(
        <div className='col-3' key={data?.id} >
 
    <div className="card m-2"  >
    {/* <img src={data?.thumbnail} className="card-img-top" alt="Product" height={'300px'} width={'100px'}/> */}
    <LazyLoadingImage
                     src={`${data?.thumbnail}`}
                     className="card-img-top" 
                     alt={`${data?.title}`}
                    Effect='blur'
                    
                    />
    <div className="card-body">
      <h5 className="card-title">
        {data?.title}
      </h5>
      <p className="card-text">{data?.description}</p>
      <p >{data?.category}</p>
      <p style={{textDecorationLine:'line-through'}}>Price:{formatPrice(data?.price)}</p>
      <p >Price:{formatPrice(DiscountedPrice)}</p>
<br></br>
      <Rating name="read-only" value={data?.rating} readOnly />
      <a href="#!" className="btn btn-primary" data-mdb-ripple-init onClick={() => { addToCartHandler(data)}}>Add To Cart</a>
    </div>
  </div>
  </div>
)})}
  </div>
  </div>

  </>
  )
}

export default Products