import ProductsReducer from "./productReducer";
import LoginReducer from "./LoginReducer";
import { combineReducers } from "redux";
import OrderReducer from "./orderReducer";

const rootReducer = combineReducers({
    products: ProductsReducer,
    user:LoginReducer,
    orders:OrderReducer
})

export default rootReducer;