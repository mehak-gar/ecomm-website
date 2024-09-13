/* eslint-disable @next/next/no-img-element */
'use client';

// import { clearCart, getAllCarts, getCartTotal, removeFromCart, toggleCartQty } from '@/feature/user/CartSlice';
import { AppDispatch } from '@/store';
import { updateUi } from '@/store/Products';
import { clearCart, getAllCarts, getCartItemsCount, getCartTotal, removeFromCart, toggleCartQty } from '@/store/cart';
import { formatPrice } from '@/utils/helper';
import { Button, Drawer } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Cart = (props:any) => {
      // ** Props
  const { open } = props;
  const dispatch=useDispatch<AppDispatch>()
  const handleClose = () => {
    dispatch(updateUi({ opencart: { open: false } }));
 
  };
  const carts = useSelector(getAllCarts);
const itemquantity=useSelector(getCartItemsCount)
const totalAmount=useSelector((state:any)=>state?.carts?.totalAmount)
// console.log('cart',carts)

useEffect(() => {
  dispatch(getCartTotal());
}, [carts, dispatch])
const shopping_cart='https://cdn-icons-png.flaticon.com/128/726/726496.png'
  if(carts?.length === 0){
    return (
      <>
      <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: { xs: 1000, sm: 1000 } } }}
    >
    <section className="h-100 gradient-custom">
      <div className='container my-5'>
        <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
          <img src = {shopping_cart} alt = ""  height={'30px'} width={'30px'}/>
          <span className='fw-6 fs-15 text-gray'>Your shopping cart is empty.</span>
          <Button onClick={handleClose} className='shopping-btn  text-white fw-5'>Go shopping Now</Button>
        </div>
      </div>
      </section>
    </Drawer>
      </>
    )
  }

  return (
    <>
        <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: { xs: 1000, sm: 1000 } } }}
    >
 
    <section className="h-100 gradient-custom">
  <div className="container py-5">
  <div className="row d-flex justify-content-center my-4">
    
  </div>
    <div className="row d-flex justify-content-center my-4">
      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Cart - {itemquantity} items</h5>
          </div>
          <div className="card-body">
         {carts?.map((data:any)=>(
            <div className="row" key={data?.id}>
              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
             
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={data?.thumbnail}
                    className="w-100" alt="Blue Jeans Jacket" />
                  <a href="#!">
                    <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}}></div>
                  </a>
                </div>
             
              </div>

              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
             
                <p><strong>{data?.title}</strong></p>
             
                <p className="text-start text-md-center">
              Price-{data?.discountedPrice}
                </p>
                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm me-1 mb-2" data-mdb-tooltip-init
                  title="Remove item" onClick={()=>dispatch(removeFromCart(data?.id))}>
                  <i className="fas fa-trash"></i>
                </button>
             
             
              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
               
                <div className="d-flex mb-4" style={{maxWidth:" 300px"}}>
                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-3 me-2"
               onClick={()=>dispatch(toggleCartQty({id: data?.id, type: "DEC"}))}>
                    <i className="fas fa-minus"></i>
                  </button>

                  <div data-mdb-input-init className="form-outline">
                    <input id="form1" min="0" name="quantity" value={data?.quantity} onChange = {()=>{''}}type="number" className="form-control" />
           
                  </div>

                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-3 ms-2"
                    onClick={()=>dispatch(toggleCartQty({id: data?.id, type: "INC"}))}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                

          
                <p className="text-start text-md-center">
                  <strong>{formatPrice(data?.totalPrice)}</strong>
                </p>
             
              </div>
            </div>))}
         
            <hr className="my-4" />

            
         
          </div>
        </div>
       

      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Summary</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Total Qunatity
                <span>{itemquantity}</span>
              </li>
             
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  
                </div>
                <span><strong>{formatPrice(totalAmount)}</strong></span>
              </li>
            </ul>

            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</Drawer>
    </>
  )
}

export default Cart