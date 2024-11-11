import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { product_context } from '../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CreatePage = () => {

  const {product,setProduct} = useContext(product_context);
  const Navigate = useNavigate(); 
    const [input, setinput] = useState ({title:"",description:"",brand:"",price:"",discountPercentage:""})
    const getInput=(a)=>{
        
        setinput({...input,[a.target.name]:a.target.value})
    }

    console.log(product);
    
    const AddProducts=(p)=>{
        p.preventDefault();
        const newTableData = ([...product,input])
        setProduct(newTableData)
        console.log(newTableData);

        // Display success toast message with the product name
        toast.success(`Product "${input.title}" has been successfully created!`);

        Navigate("/home")

    }

    
   

  return (
    <>
    <h1 style={{textAlign:"center",marginTop:"80px"}}>Add New Product</h1>
    <div className='parent'>
        
    <Form onSubmit={AddProducts}  className='form' >

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Name"
        onChange={getInput}
        name="title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Description"
        onChange={getInput}
        name="description" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Brand</Form.Label>
        <Form.Control type="text" placeholder="Enter Brand Name"
        onChange={getInput}
        name="brand" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter Price"
        onChange={getInput}
        name="price" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control type="text" placeholder="Enter Discount Percentage" 
        onChange={getInput}
        name="discountPercentage"/>
      </Form.Group>
     
      <Button className='formbtn' variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </>
  )
}

export default CreatePage