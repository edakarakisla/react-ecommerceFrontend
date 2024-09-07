import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { increment } from '../store/features/cartSlice'
import { toast } from 'react-toastify'


function ProductDetail() {

  const dispatch = useDispatch()

  const { productName } = useParams()

  const [data, setData] = useState({})


  useEffect(() => {
    getDataById()
  }, [])


  const getDataById = async () => {
    let id = productName.split("-p-")[1]
    try {
      let response = await axios.get("http://localhost:9000/product/product/" + id)
      setData(response.data.product)
    } catch (error) {
      console.log("Get Product Error", error)
    }
  }

  const addToCart = () => {
    dispatch(increment(data))
    toast.success("Product Added", {autoClose: 2000})
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen px-4">
    {/* Product Image */}
    <div className="flex justify-center md:w-1/2 mb-6 md:mb-0">
      <img
        src={data.image}
        alt="product_image"
        className="w-full h-auto max-w-xs md:max-w-md"
      />
    </div>
  
    {/* Product Details */}
    <div className="flex flex-col items-center md:items-start md:w-1/2">
      <p className="text-2xl md:text-3xl font-medium text-center md:text-left">{data.name}</p>
      <p className="text-3xl md:text-4xl font-bold mt-4 text-center md:text-left">{data.price}$</p>
      <button
        onClick={addToCart}
        className="mt-4 text-white bg-lime-700 hover:bg-lime-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >
        Add To Cart
      </button>
    </div>
  </div>
  
  
  )
}

export default ProductDetail