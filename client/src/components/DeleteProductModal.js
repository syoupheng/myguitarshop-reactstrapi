import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {deleteProduct} from '../features/products/productsSlice';
import axios from 'axios';
import {useDispatch} from 'react-redux';

export const DeleteProductModal = (props) => {
  const dispatch = useDispatch();

  async function handleDeleteProduct(product) {
    try {
      // await axios.delete(`/api/products/${product._id}`);
      dispatch(deleteProduct(product));
      props.hide();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal backdrop="static" keyboard={false} show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete a product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this product ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>Cancel</Button>
        <Button variant="primary" onClick={() => handleDeleteProduct(props.product)}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteProductModal;