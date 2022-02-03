import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function ProductList({ products }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
      {products.map((product) => (
        <Col>
          <Link to={`/products/${product.id}`} className='text-decoration-none text-black'>
            <Card key={product.id.toString()}>
              <Card.Img style={{ "width": "100%", "height": "15vw", "object-fit": "cover" }} variant="top" src={product.attributes.images.data ? product.attributes.images.data[0].attributes.formats.medium.url : ""} alt="photo not available" />
              <Card.Body>
                <Card.Title className="fw-bold">{product.attributes.title}</Card.Title>
                <Card.Text>
                  {product.attributes.unit_price} €
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  )
}