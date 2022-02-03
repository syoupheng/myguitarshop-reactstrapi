import { useQuery } from 'react-query';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';

const fetchPopularProducts = async () => {
  const res = await axios.get("/api/products?sort[0]=rating%3Adesc&pagination[pageSize]=4&populate=*");
  return res;
}

export default function PopularCarousel() {
  const { data, status } = useQuery('popularProducts', fetchPopularProducts);
  let products = data || [];

  return (
    <>
      <h1 className='text-center'>Our Most Popular products</h1>
      {status === 'loading' && (
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {status === 'error' && (
        <div className="alert alert-danger" role="alert">
          Error fetching data
        </div>
      )}

      {status === 'success' && (
        <div style={{"padding": "20px 300px 20px 300px"}}>
          <Carousel>
          {products.data.data.map(product =>
            <Carousel.Item key={product.id}>
              <img
                className="d-block w-100"
                src={product.attributes.images.data ? product.attributes.images.data[0].attributes.formats.medium.url : ""}
                alt="No photo"
              />
              <Carousel.Caption>
                <h3>{product.attributes.brand}</h3>
                <p>{product.attributes.title}</p>
              </Carousel.Caption>
            </Carousel.Item>)}
        </Carousel>
        </div>
      )}
    </>
  );
}