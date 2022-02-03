import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {useDispatch} from 'react-redux';
import {addProduct} from '../features/products/productsSlice';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className='mb-1'>{label}</label>
      <input className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className='mb-1'>{label}</label>
      <textarea className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </>
  );
};

export const AddProductForm = (props) => {
  return (
    <div className='container'>
      <Formik
      initialValues={{title: '', brand: '', quantity: null, unit_price: null, description: '', image: null}}
      validationSchema={Yup.object({
        title: Yup.string().required(),
        quantity: Yup.number().required('Required field').positive().integer(),
        unit_price: Yup.number().required('Required field').positive(),
      })}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      >
        <Form>
          <div className='form-group mb-3'>
            <MyTextInput 
              label="Title"
              name="title"
              type="text"
              placeholder="Enter a product"
            />
          </div>
          <div className='row mb-3'>
            <div className='form-group mb-3 col'>
              <MyTextInput 
                label="Brand"
                name="brand"
                type="text"
                placeholder="Brand"
              />
            </div>
            <div className='form-group mb-3 col'>
              <MyTextInput 
                label="Quantity"
                name="quantity"
                type="number"
                placeholder="Quantity"
              />
            </div>
            <div className='form-group mb-3 col'>
              <MyTextInput
                label="Unit Price"
                name="unit_price"
                type="number"
                step=".01"
                placeholder="Unit Price"
              />
            </div>
          </div>
          <div className='form-group mb-3'>
            <MyTextArea
              label="Description"
              name="description"
              placeholder="Enter a description"
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="image" className='mb-1'>Image</label>
            <Field name="image" type="file" placeholder="Import an image" className='form-control' />
            <ErrorMessage name="image"/>
          </div>
          <div className='container text-center'>
            <div className='form-group'>
              <button type="submit" className='btn btn-primary ms-2'>Submit</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};


// export const AddProductForm = (props) => {
//   const dispatch = useDispatch();
//   const [inputs, setInputs] = useState({});

//   const handleChange = (e) => {
//     const name = e.target.id;
//     const value = e.target.value;
//     setInputs(values => ({...values, [name]: value}));
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addProduct({
//       id: uuidv4(),
//       attributes: inputs
//     }));
//     props.hide();
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="title">
//         <Form.Label>Title</Form.Label>
//         <Form.Control type="text" placeholder="Enter the title of your product" value={inputs.title || ""} onChange={handleChange}/>
//       </Form.Group>
//       <Row className="mb-3">
//         <Form.Group as={Col} className="mb-3" controlId="brand">
//           <Form.Label>Brand</Form.Label>
//           <Form.Control type="text" placeholder="Enter the brand of your product" value={inputs.brand || ""} onChange={handleChange}/>
//         </Form.Group>
//         <Form.Group as={Col} controlId="quantity">
//           <Form.Label>Quantity</Form.Label>
//           <Form.Control type="number" placeholder="Quantity" value={inputs.quantity || null} onChange={handleChange} />
//         </Form.Group>
//         <Form.Group as={Col} controlId="unit_price">
//           <Form.Label>Unit Price</Form.Label>
//           <Form.Control type="number" placeholder="Unit Price" step=".01" value={inputs.unit_price || null} onChange={handleChange}/>
//         </Form.Group>
//       </Row>
//       <Form.Group className="mb-3" controlId="description">
//         <Form.Label>Description</Form.Label>
//         <Form.Control as="textarea" placeholder="Enter a description" value={inputs.description || ""} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="formFile" className="mb-3">
//         <Form.Label>Add a picture</Form.Label>
//         <Form.Control type="file" />
//       </Form.Group>
//       <Row>
//         <Container className="text-center">
//           <Button className="me-2"variant="secondary" onClick={props.hide}>
//             Close
//           </Button>
//           <Button type="submit" className="ms-2" variant="primary">
//             Save Changes
//           </Button>
//         </Container>
//       </Row>
//     </Form>
//   )
// }

export default AddProductForm;