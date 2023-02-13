import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts();
        }
        fetchData();
    }, [])

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/products`);
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCreate = async () => {
        try {
            await axios.post('http://localhost:3000/products', product);
            setShowCreateModal(false);
            fetchProducts();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Row>
                <Col className='text-center'>
                    <Button onClick={() => setShowCreateModal(!showCreateModal)} color='primary'>Create product</Button>
                    <Row className='mt-4'>
                        {products.map(product => (
                            <Col className='d-flex' lg="4" md="6" sm="12" xs="12" key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Modal isOpen={showCreateModal} toggle={() => setShowCreateModal(false)}>
                <ModalHeader toggle={() => setShowCreateModal(false)}>Create Product</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                defaultValue={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                placeholder="Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="textarea"
                                id="description"
                                defaultValue={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                placeholder="Description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                type="number"
                                id="price"
                                defaultValue={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                placeholder="Price"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input
                                type="number"
                                id="quantity"
                                defaultValue={product.quantity}
                                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                                placeholder="Quantity"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image URL</Label>
                            <Input
                                type="text"
                                id="image"
                                defaultValue={product.image}
                                onChange={(e) => setProduct({ ...product, image: e.target.value })}
                                placeholder="Image URL"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
                    <Button color="primary" onClick={handleCreate}>Save</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ProductList;