import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { product_context } from '../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Edit_Form = () => {
    const { product, setProduct, productid } = useContext(product_context);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        brand: '',
        price: '',
        discountPercentage: ''
    });

    const navigate = useNavigate();

    // Find the selected product by ID
    useEffect(() => {
        const selectedProduct = product.find((p) => p.id === productid);
        if (selectedProduct) {
            setFormData({
                title: selectedProduct.title,
                description: selectedProduct.description,
                brand: selectedProduct.brand,
                price: selectedProduct.price,
                discountPercentage: selectedProduct.discountPercentage
            });
        }
    }, [product, productid]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProducts = product.map((p) =>
            p.id === productid ? { ...p, ...formData } : p
        );
        setProduct(updatedProducts); // Update the product list with edited details

        // Display success toast message with the product name
        toast.success(`Product "${formData.title}" has been successfully edited!`);
        
        navigate('/home'); // Redirect back to the home page
    };

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "80px" }}>Edit</h1>
            <div className="parent">
                <Form className="form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Discount Percentage</Form.Label>
                        <Form.Control type="text" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />
                    </Form.Group>
                    <Button className="formbtn" variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Edit_Form;
