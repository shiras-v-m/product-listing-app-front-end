import React, { useEffect, useRef, useState } from 'react'
import './CreateCategory.css'
import axios from 'axios'
import BASE_URL from '../services/baseUrl'
import { useNavigate } from 'react-router-dom'

   
 function CreateCategory() {
    const navigate=useNavigate()

    const inputRef=useRef(null)
    const [item,setItem]=useState('')
    const [addedItems,setAddedItems]=useState([])


    const addCategories=async ()=>{
        await axios.post(`${BASE_URL}/createCategories`,{categories:addedItems}).then((res)=>{
            console.log(res.data.message);
            alert(res.data.message)
            navigate('/addproduct')
    }).catch((error)=>{
        console.log(error.response.data.error); 
        alert(error.response.data.error)
    })
    }


    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        if(addedItems.length==0 && item){
             setAddedItems([item])
         }

        
    //    if(addedItems.length==0 && item.length>0){
    //         setAddedItems([item.trim()])
           
    //    }
    //    else{
    //      setAddedItems([])
    //    }
       addCategories()
      
   
       
         
            
    }
    const handleAddItem= (e)=>{
        e.preventDefault()
        console.log("item added");
        setAddedItems([...addedItems,item.trim()])
        setItem('')
        // clear input field

      
        // foucs on inputField
    }
    useEffect(() => {
        inputRef.current.focus();
     });
     
    const handleClose=(index)=>{
       let array=addedItems

        let deleted=array.splice(index,1)
        console.log(deleted+" item");
        setAddedItems([...array])
       
    }
    console.log(addedItems);

  return (
    <div className="container">
        <div className="frame">
            <h2>Add Categories</h2>
            <form onSubmit={handleSubmit}>
               <div className='formData1'>
                    <span className='titleTxt'>Title</span>
                    <input ref={inputRef} autoFocus className='inputCategory' type="text" value={item} placeholder='Enter category name...' onChange={(e)=>{setItem(e.target.value)}} required/>
                    <span  className="material-symbols-outlined addCategoryIcon" onClick={(e)=>handleAddItem(e)} >add</span>
               </div>
                <div className='addedItems' >
                 {addedItems.length>0 && addedItems?.map((category,index)=>(
 <span key={index} className='itemTxt'>{category} <span  onClick={()=>handleClose(index)} className="material-symbols-outlined closeIcon">close</span></span>
                 ) ) }
                </div>
                <button >Submit</button>
            </form>
        </div>
    </div>

  )
}

export default CreateCategory