import React, { useEffect, useState } from 'react'
import './AddProduct.css'
import BASE_URL from '../services/baseUrl';
import axios from 'axios';
function AddProduct() {
  const [data,setData]=useState({
    pName:"",
    description:"",
    price:"",
  })
  // const [description,setDescription]=useState('')
  // const [price,setPrice]=useState('')
  const [selectedOption, setSelectedOption] = useState  ('');
  const [selectedOptionId,setSelectedOptionId]=useState('')
  const [categoriesData,setCategoriesData]=useState([])
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

  };
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };


  const getAllCategories= async ()=>{
   await axios.get(`${BASE_URL}/getAllCategories`).then((res)=>{   
      setCategoriesData(res.data.categories)

  }).catch((error)=>{
      console.log(error);
    })
  }

  const addProduct= async ()=>{
    await axios.post(`${BASE_URL}/createProduct`,{id:selectedOptionId,...data}).then((res)=>{   
      console.log(res);
      alert(res.data.message)
      setData({
        pName:"",
        description:"",
        price:"",
      })
  }).catch((error)=>{
      console.log(error.response.data.message);
    })
  }
  useEffect(()=>{
    getAllCategories()
  },[])

  const handleSubmit= (e)=>{
    e.preventDefault()
    if(!selectedOptionId && categoriesData){
      setSelectedOptionId(categoriesData[0]['_id'])
      console.log("Not found so setted");
    }
    addProduct()

  }
  console.log(selectedOptionId);
  console.log(categoriesData);

  return (
    <div className="container">
      <div className="frame">
        <h2>Add Product</h2>
        <form  onSubmit={handleSubmit}>
          <div className='formData'>
       
            <div className='inputFieldContainer'>
              <span className='titleTxt'>Category</span>
              <select className='inputCategory' value={selectedOption} onChange={handleSelectChange}>
        {categoriesData?.map((item,index)=>(
            <option onClick={()=>setSelectedOptionId(item._id)} key={index} value={item.categoryName}>{item.categoryName}</option>
        )) 
        }
        {  !categoriesData &&   <option >No category found</option>}
       
  
      </select>
            
            </div>

            <div className='inputFieldContainer'>
              <span className='titleTxt'>Product Name</span>
              <input className='inputCategory'   name="pName" type="text" value={data.pName} onChange={handleInputChange} placeholder='Enter Product name...' />
            </div>
            <div className='inputFieldContainer'>
              <span className='titleTxt'>Description</span>
              <input className='inputCategory' type="text"   name="description" value={data.description} onChange={handleInputChange} placeholder='Enter Description name...' />
            </div>
            <div className='inputFieldContainer'>
              <span className='titleTxt'>Price</span>
              <input className='inputCategory' type="Number"    name="price"  value={data.price} onChange={handleInputChange} placeholder='Enter price name...' />
            </div>


          </div>

          <button >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct