import React from 'react';
import ProductList from './components/ProductList';
import { Container, Row, Col } from "reactstrap";

const App = () => {
  return (
    <Container className='w-100 vh-100'>
      <Row className='w-100 h-100 justify-content-center'>
        <Col className='text-center'>
          <h1 className='display-1'>Products</h1>
          <h3 className='font-weight-lighter text-muted'>Your Products App</h3>
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
};

export default App;