import React, { useEffect, useState } from 'react'
import axios from "axios"
import ProductComponent from '../components/ProductComponent'
import { useNavigate } from 'react-router-dom'

function Home() {


  const navigate = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
   
      let response = await axios.get("http://localhost:9000/product/product")
  
      setData(response.data.products)
    } catch (error) {
      console.log("Get All Product Error", error)
    }
  }

  const goToDetail = (product) => {

    navigate(`/product-detail/${product.name}-p-${product._id}`) 
  }


  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {/* <button onClick={fetchData}>Get Data</button> */}
        {
          data.map((product, index) => (
            <ProductComponent product={product} onClick={goToDetail} key={index} />
          ))
        }

      </div>
    </>
  )
}

export default Home
  