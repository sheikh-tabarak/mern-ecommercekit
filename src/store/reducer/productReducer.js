import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT_LIST } from '../actions/ProductActions';

const initialState = {
  ProductsData: [
    {
      id: 0,
      name: "Nike Mercurial Vapor 13 Elite FG",
      desc: "Test Description",
      category: 0,
      price: 250,
      stock: 3,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg",
    },

    {
      id: 1,
      name: "Nike Mercurial Vapor 13 Elite FG",
      desc: "Test Description",
      category: 1,
      price: 300,
      stock: 0,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg",
    },

    {
      id: 2,
      name: "Nike Mercurial Vapor 13 Elite FG",
      desc: "Test Description",
      category: 1,
      price: 800,
      stock: 2,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg",
    },
  ],
};

const ProductsReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        ProductsData: [...state.ProductsData, action.payload],
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        ProductsData: state.ProductsData.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        ProductsData: state.ProductsData.filter(
          (product) => product.id !== action.payload
        ),
      };

      case SET_PRODUCT_LIST:
        return {
          ProductsData: action.payload,
        };

    default:
      return state;
  }

};

export default ProductsReducer;