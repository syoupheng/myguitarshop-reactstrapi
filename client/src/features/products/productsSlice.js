import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
      products: []
    },
    reducers: {
      addProduct: (state, action) => {
        state.products.push(action.payload)
      },
      deleteProduct: (state, action) => {
        console.log(action.payload);
        state.products = state.products.filter(item => item.id !== action.payload.id)
      },
      addManyProducts: (state, action) => {
        console.log(action.payload);
        action.payload.forEach((product) => state.products.push(product))
      },
    }
  })
  
  export const selectProducts = state => state.products

  export const { addProduct, deleteProduct, addManyProducts } = productsSlice.actions
  
  export default productsSlice.reducer