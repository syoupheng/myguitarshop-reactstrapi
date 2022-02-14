import { createSlice } from '@reduxjs/toolkit'

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState: [],
    reducers: {
      addItem: (state, action) => {
        state.push(action.payload)
      },
      prepare(id, attributes, quantity) {
        return {
          payload: {
            id,
            ...attributes,
            quantity
          }
        }
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

  export const { addItem, deleteProduct, addManyProducts } = cartItemsSlice.actions
  
  export default cartItemsSlice.reducer