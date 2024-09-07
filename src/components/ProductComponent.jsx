import React from 'react'
import { useDispatch } from 'react-redux'
import { increment } from '../store/features/cartSlice'
import { toast } from 'react-toastify'


function ProductComponent({ product, onClick }) {
  
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(increment(product))
    toast.success("Product added to cart")
  }

  return (

    
    <>
        


        <div className='w-full max-w-sm bg-transparent border border-gray-200 rounded-lg shadow-lg mx-auto my-6'>
  <p className='text-2xl font-bold text-gray-700 text-center mt-4'>{product.name}</p>
  <img
    className='py-4 px-8 rounded-t-lg mx-auto max-h-80 object-cover'
    src={product.image}
    alt={product.name}
    onClick={() => onClick(product)}
  />
  <div className='px-4 pb-4'>
    <div className='flex items-center justify-between'>
      <span className='text-3xl font-bold text-gray-700'>{product.price}$</span>
      <button
        onClick={() => handleAddToCart(product)}
        className=' bg-lime-700 hover:bg-lime-600   text-white font-medium rounded-lg text-sm px-4 py-2.5 transition duration-300'
      >
        Add To Cart
      </button>
    </div>
  </div>
</div>






    </>
  )
}

export default ProductComponent