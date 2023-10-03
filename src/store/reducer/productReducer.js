import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT_LIST,
} from "../actions/ProductActions";

const initialState = {
  ProductsData: [
    {
      id: "uklBvDtAderDdrerwerweASD",
      name: "MEN'S BETTER THAN NAKED trade; JACKET",
      desc: "MEN'S BETTER THAN NAKED trade; JACKET designed and fashioned by imported Leather",
      category: 1,
      price: 11,
      stock: 5,
      image:
        "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/mens-better-than-naked-jacket-AVMH_LC9_hero.png",
    },
    {
      id: "jasdoayuewnasdksadasd",
      name: "WOMEN'S BETTER THAN NAKED&trade; JACKET",
      desc: "WOMEN'S BETTER THAN NAKED&trade; JACKET with heavy leather coated",
      image:
        "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-better-than-naked-jacket-AVKL_NN4_hero.png",
      category: 0,
      price: 23,
      stock: 10,
    },
    {
      id: "lqwe0rwermksds0ifsdfls",
      name: "WOMEN'S SINGLE-TRACK SHOE",
      desc: "WOMEN'S SINGLE-TRACK SHOE with heavy leather coated",
      image:
        "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-single-track-shoe-ALQF_JM3_hero.png",
      category: 0,
      price: 12,
      stock: 9,
    },
    {
      id: "jimqwiewr9erweedfd",
      name: "Enduro Boa&reg; Hydration Pack",
      desc: "Enduro Boa&reg; Hydration Pack with bottled water",
      image:
        "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/enduro-boa-hydration-pack-AJQZ_JK3_hero.png",
      category: 2,
      price: 11,
      stock: 2,
    },

    {
      id: "skweoirweurnsdfnsdf",
      name: "Nike Mercurial Vapor 13 Elite FG",
      desc: "Test Description",
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/h5le0w4zurlgymfthgea/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.png",
      category: 0,
      price: 19,
      stock: 0,
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
