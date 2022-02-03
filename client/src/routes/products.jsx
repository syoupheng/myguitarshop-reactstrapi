import { useSearchParams } from "react-router-dom";
import ProductList from '../components/ProductList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import Alert from 'react-bootstrap/Alert';
import { useQuery } from "react-query";

const fetchProducts = async (category, page=1) => {
  let uri = `/api/products?sort[0]=publishedAt%3Adesc&populate=*&pagination[page]=${page}&pagination[pageSize]=6`;
  if (category) {
    uri = `/api/products?sort[0]=publishedAt%3Adesc&filters[categories][name][$eq]=${category}&populate=*&pagination[page]=${page}&pagination[pageSize]=6`;
  }
  const res = await axios.get(uri);
  console.log(uri);
  return res;
}

export default function Products() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  let category = searchParams.get('category') || '';
  useEffect(() => {    
    // Update the document title using the browser API    
    setPage(1);  
  }, [searchParams]);
  const { data, status, isPreviousData } = useQuery(['products', category, page], () => fetchProducts(category, page), { keepPreviousData : true });
  let products = data || [];
  
  let listProducts = <Alert variant="warning">No products...</Alert>;
  
  if (products.length > 0) {
    listProducts = (
      <ProductList products={products}/>
    );
  }

  return (
    <>
      {status === "loading" && (
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {status === "error" && (
        <div className="alert alert-danger" role="alert">
          Error fetching data
        </div>
      )}

      {status === "success" && (
        <Container>
          <ProductList products={products.data.data} />
          <div className="my-3 text-center">
            <span className="me-2">Current Page: {page}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Previous Page
            </button>{" "}
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                if (
                  !isPreviousData &&
                  products.data.meta.pagination.pageCount > page
                ) {
                  console.log("ok");
                  setPage((old) => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={
                isPreviousData ||
                products.data.meta.pagination.pageCount <= page
              }
            >
              Next Page
            </button>
            {status === "fetching" ? <span> Loading...</span> : null}{" "}
          </div>
        </Container>
      )}
    </>
  );
}