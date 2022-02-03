import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddToCartForm from './AddToCartForm';

export default function ProductPage({ product }) {
  return (
    <>
      <Row className='mb-3'>
        <Col>
          <div>{product.attributes.brand}</div>
          <h2>{product.attributes.title}</h2>
          <div>{product.attributes.unit_price} €</div>
          <hr className='my-5'></hr>
          <AddToCartForm />
        </Col>
        <Col>
          <img src={product.attributes.images.data ? product.attributes.images.data[0].attributes.formats.medium.url : ""} alt="No Photo"></img>
        </Col>
      </Row>
      <div>{product.attributes.description}</div>
    </>
  )
}