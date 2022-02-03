import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import ProductPage from '../components/ProductPage';

const fetchProductbyId = async (productId) => {
  const res = await axios.get(`/api/products/${productId}?populate=*`);
  return res;
}

export default function Product() {
  let params = useParams();
  let productId = parseInt(params.productId);
  const { data, status } = useQuery(['product', productId], () => fetchProductbyId(productId));
  let product = data || {};

  return (
    <Container>
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
        <ProductPage product={product.data.data} />
      )}
    </Container>
  );
}