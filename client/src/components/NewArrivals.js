import { useQuery } from 'react-query';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import ProductList from './ProductList';

const fetchNewProducts = async () => {
  const res = await axios.get("/api/products?sort[0]=publishedAt%3Adesc&pagination[pageSize]=9&populate=*");
  return res;
}

export default function NewArrivals() {
  const { data, status } = useQuery('newArrivals', fetchNewProducts);
  let products = data || [];

  return (
    <>
      <h1 className='text-center mb-4'>Check Out Our New Arrivals !</h1>
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
        <Container>
          <ProductList products={products.data.data} />
        </Container>
      )}
    </>
  );
}