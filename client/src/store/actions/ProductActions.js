// productsActions.js
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';

// Action creators
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});


export const setProductList = (productList) =>({
  type:SET_PRODUCT_LIST,
  payload:productList
})
