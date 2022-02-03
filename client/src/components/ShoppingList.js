import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  addProduct,
  deleteProduct,
  addManyProducts,
} from '../features/products/productsSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddProductModal from './AddProductModal';
import DeleteProductModal from './DeleteProductModal';

export function ShoppingList() {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get('/api/products');
        setIsLoading(false);
        dispatch(addManyProducts(res.data.data));
      } catch (e) {
        console.log(e)
      }
    }
    getProducts();
  }, []);

  let listProducts = <Alert variant="warning">No products</Alert>;
  if (products.length > 0) {
    listProducts = products.map((product) =>
      <ListGroup.Item key={product.id.toString()}>
        <Row>
          <Col xs='auto'>
            <Button variant="danger" size="sm" onClick={() => {
              setProductToDelete(product);
              handleShowDelete()
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </Button>
          </Col>
          <Col>{product.attributes.title}</Col>
          <Col xs='auto'>{product.attributes.unit_price} euros</Col>
        </Row>
      </ListGroup.Item>);
  } /*else {
    listProducts = <Alert variant="warning">No products</Alert>;
  }*/

  return (
    <Container>
      <Button variant="secondary" className="mb-3" onClick={handleShowAdd}>Add product</ Button>
      <AddProductModal show={showAdd} hide={handleCloseAdd}/>
      <DeleteProductModal product={productToDelete} show={showDelete} hide={handleCloseDelete}/>
      <ListGroup>
        {isLoading ? <p>isLoading...</p> : listProducts}
      </ListGroup>
    </Container>
  )
}

// class ShoppingList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {products: []};
//     }
    
//     async componentDidMount() { 
//         try {
//             const res = await axios.get('/api/products');
//             this.setState({
//                 products: res.data.products
//             });
//         } catch(e) {
//             console.log(e)
//         }
//     }

//     addProduct() {
//         const product = prompt('Enter the title of your product : ');
//         if (product) {
//         }
//     }

//     async deleteProduct(product_id) {
//         try {
//             await axios.delete(`/api/products/${product_id}`);
//             this.setState(
//                 state => ({
//                     products: state.products.filter(item => item._id !== product_id)
//                 })
//             );
//         } catch(e) {
//             console.log(e);
//         }
//     }

//     render() {
//         const listProducts = this.state.products.map((product) =>
//         <ListGroup.Item key={product._id.toString()}>
//             <Row>
//               <Col xs='auto'>
//                 <Button variant="danger" size="sm" onClick={() => this.deleteProduct(product._id)}>
//                   &times;
//                 </Button>
//               </Col>
//               <Col>{product.title}</Col>
//               <Col xs='auto'>{product.unit_price} euros</Col>
//             </Row>
//         </ListGroup.Item>);
        
//         return (
//             <Container>
//                 <Button variant="secondary" className="mb-3" onClick={this.addProduct}>Add product</ Button>
//                 <ListGroup>
//                     {this.state.products.length > 0 ? listProducts : <Alert variant="warning">No products</Alert>}
//                 </ListGroup>
//             </Container>
//         )
//     }
// }

export default ShoppingList;
