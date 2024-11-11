import React, { useContext, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { product_context } from '../App';
import Modal from 'react-bootstrap/Modal';
import { Rating } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  // Cart Icon
import SearchIcon from '@mui/icons-material/Search';  // Search Icon

const HomePage = () => {
    const { product, setProduct, productid, setproductid } = useContext(product_context); // Use setProduct to update the product list
    const [show, setShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [Icon, setIcon] = useState(true);
    const [searchInput, setSearchInput] = useState(''); // Add search input state
    const navigate = useNavigate();

    const getProductID = (id) => {
        setproductid(id);
        setShow(true);
    };

    const editProduct = (id) => {
        setproductid(id);
        navigate("/edit");
    };

    const removeProduct = (product) => {
        setProductToDelete(product);
        setDeleteModal(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            // Remove the product from the product list
            setProduct((prevProducts) => prevProducts.filter((p) => p.id !== productToDelete.id));

            // Show success toast message with the product name
            toast.success(`Product "${productToDelete.title}" has been successfully deleted!`);

            // Close the modal and reset the product to delete
            setDeleteModal(false);
            setProductToDelete(null);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
        setProductToDelete(null);
    };

    const handleClose = () => setShow(false);

    const handleSearchChange = (e) => {
        setIcon(false);
        setSearchInput(e.target.value);
    };

    // Filter products based on the search input
    const filteredProducts = product.filter((item) => 
        item.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            {/* Delete Confirmation Modal */}
            <Modal show={deleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this product?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Product Details Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{productid ? productid.title : "Product Details"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productid ? (
                        <>
                            <img src={productid?.thumbnail} alt="Product" style={{ width: '60%', height: '60%' }} />
                            <p><strong>Product Name:</strong> {productid?.title}</p>
                            <p><strong>Description:</strong> {productid?.description}</p>
                            <p><strong>Price:</strong> ${productid?.price}</p>
                            <p><strong>Rating:</strong> <Rating name="customized-10" defaultValue={productid?.rating} max={7} /></p>
                        </>
                    ) : (
                        <p>No product selected.</p>
                    )}
                </Modal.Body>
            </Modal>

            <div style={{ backgroundColor: "black", color: "white" }}>
                <div className="d-flex justify-content-between align-items-center">
                    {/* Product List Heading */}
                    <h1 className="text-center p-4">Product Management <ShoppingCartIcon /></h1>

                    {/* Search Section */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchInput}
                            onChange={handleSearchChange}
                            className="search-input"
                            style={{ marginRight: "20px" }}
                        />
                        {Icon ? <SearchIcon className="search-icon" /> : ""}
                    </div>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '350px' }}>Title</th>
                            <th style={{ width: '350px' }}>Brand</th>
                            <th>Price</th>
                            <th style={{ width: '200px' }}>Discount Percentage</th>
                            <th style={{ width: '300px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((items) => (
                            <tr key={items.id}>
                                <td>{items.title}</td>
                                <td>{items.brand}</td>
                                <td>${items.price}</td>
                                <td>{items.discountPercentage}</td>
                                <td>
                                    <button onClick={() => getProductID(items)} className='btn btn1'>
                                        <VisibilityIcon />
                                    </button>
                                    <button onClick={() => editProduct(items.id)} className='btn btn2'>
                                        <EditIcon />
                                    </button>
                                    <button onClick={() => removeProduct(items)} className='btn btn3'>
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Link to="/formCreate">
                    <Button className='create-btn'>Create Product</Button>
                </Link>
            </div>
        </>
    );
};

export default HomePage;
