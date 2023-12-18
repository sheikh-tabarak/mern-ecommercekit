import { combineReducers } from "redux";
import ProductsReducer from "./productReducer";
import LoginReducer from "./LoginReducer";
import OrderReducer from "./orderReducer";
import appReducer from "./LoginStatus";

const rootReducer = combineReducers({
    products: ProductsReducer,
    user:LoginReducer,
    orders:OrderReducer,
    app:appReducer
})

export default rootReducer;