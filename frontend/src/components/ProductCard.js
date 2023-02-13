import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, CardHeader, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const ProductCard = (props) => {
    const [product, setProduct] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({
        name: "",
        description: "",
        price: 0,
        image: ""
    });

    useEffect(() => {
        setProduct(props.product);
    }, [props.product]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = () => {
        setEditProduct(product);
        setIsEditing(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/products/${product.id}`, editProduct);
            setIsEditing(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (event) => {
        setEditProduct({ ...editProduct, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Card className='mb-3 flex-fill'>
                <CardHeader>
                    <h2>{product.name}</h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <p>{product.description}</p>
                            <p>Price: <span className='text-success'>${product.price}</span></p>
                            <p>Quantity: {product.quantity}</p>
                            {product.image ? <img src={product.image} alt={product.name} /> : null}
                            <Button color='success'>Buy</Button>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Row>
                            <Col>
                                <Button color='danger' onClick={() => handleDelete(product.id)}>Delete</Button>
                            </Col>
                            <Col>
                                <Button color='primary' onClick={handleEdit}>Edit product</Button>
                            </Col>
                        </Row>
                    </Row>
                </CardFooter>
            </Card>

            <Modal isOpen={isEditing} toggle={() => setIsEditing(false)}>
                <ModalHeader toggle={() => setIsEditing(false)}>Edit Product</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" defaultValue={editProduct.name} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" defaultValue={editProduct.description} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="number" name="price" defaultValue={editProduct.price} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input type="number" name="quantity" defaultValue={editProduct.quantity} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image URL</Label>
                            <Input type="text" name="image" defaultValue={editProduct.image} onChange={handleInputChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setIsEditing(false)}>Close</Button>
                    <Button color="primary" onClick={handleUpdate}>Update</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ProductCard