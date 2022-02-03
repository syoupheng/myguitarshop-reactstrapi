import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddProductForm from './AddProductForm';

export const AddProductModal = (props) => {
  return (
    <Modal backdrop="static" keyboard={false} show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>Add a product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddProductForm hide={props.hide}/>
      </Modal.Body>
    </Modal>
  )
}

export default AddProductModal;