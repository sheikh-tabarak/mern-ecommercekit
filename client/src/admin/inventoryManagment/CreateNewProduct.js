import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../loading";
import "firebase/storage";
import InputField from "../components/InputField";
import categories from "../data/categories";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/actions/ProductActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddProductValidator from "../components/addProductValidator";

export default function CreateNewProduct() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [ImageFile, setImageFile] = useState();
  const ProductsDatais = useSelector((state) => state.products.ProductsData);

  const [NewProduct, setNewProduct] = useState({
    id: uuidv4(),
    name: "",
    desc: "",
    category: 0,
    price: undefined,
    stock: 0,
    image: "",
  });

  document.title = "Product Registration | Dashboard";

  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);

  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log("Adding");

      // changing made by huzaifa
   const result = AddProductValidator(NewProduct);
   if(result?.message)
   {
     return toast.error(result.message);
   }
    //
    dispatch(addProduct(NewProduct));

    toast.success(
      <>
        <p>Product Added Successfully</p>
        {/* <p className="leading-relaxed text-sm/[12px]"></p> */}
      </>,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "bg-white dark:bg-gray-900",
        autoClose: 5000,
      }
    );

    navigate("/dashboard/products");
    // setrefreshData(!refreshData);
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const [TechList, setTechList] = useState([]);

  const [SelectedTechList, setSelectedTechList] = useState([]);

  useEffect(() => {
    // console.log(uuidv4());
    console.log(NewProduct);
  });

  return isLoading === true ? (
    <Loading />
  ) : (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-4 lg:mx-10 max-w-2xl lg:py-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new Product
        </h2>

        <label htmlFor="UploadImage">
          <div className="mb-7 w-full flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed  rounded-lg shadow ">
            <input
              className="hidden"
              id="UploadImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(file);
                setImageFile(file);
                const imageUrl = URL.createObjectURL(file);
                console.log(imageUrl);
                setNewProduct((prevState) => ({
                  ...prevState,
                  image: imageUrl,
                }));
              }}
            />

            {selectedImage === null ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            ) : (
              <img
                className="h-60 rounded-lg"
                src={
                  selectedImage === null
                    ? ""
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
              />
            )}
          </div>
        </label>

        <form onSubmit={handleAddProduct}>
          <div className="gap-4">
            <InputField
              type={"text"}
              label={"Product Title"}
              currentvalue={NewProduct.name}
              placeholder={"Enter Product Title"}
              FieldId={"title"}
              onChange={(e) => {
                setNewProduct((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));

                console.log(NewProduct.name);
              }}
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                onChange={(e) => {
                  setNewProduct((prevState) => ({
                    ...prevState,
                    desc: e.target.value,
                  }));
                  console.log(NewProduct.desc);
                }}
                id="description"
                rows={8}
                value={NewProduct.desc}
                className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                defaultValue={""}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose the category
              </label>
              <select
                onChange={(e) => {
                  setNewProduct((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }));
                  // console.log(value.target.value);
                }}
                id="category"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {categories.map((value, index) => (
                  <option value={value.id}>{value.category}</option>
                ))}
              </select>
            </div>

            <InputField
              type={"number"}
              label={"Price"}
              currentvalue={NewProduct.price}
              placeholder={"Enter Product Price"}
              FieldId={"price"}
              onChange={(e) => {
                setNewProduct((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }));

                console.log(NewProduct.price);
              }}
            />

            <InputField
              type={"number"}
              label={"Quantity"}
              currentvalue={NewProduct.stock}
              placeholder={"Enter Product Stock quantity"}
              FieldId={"stock"}
              onChange={(e) => {
                setNewProduct((prevState) => ({
                  ...prevState,
                  stock: e.target.value,
                }));

                console.log(NewProduct.stock);
              }}
            />
          </div>
          <button
            type="submit"
            className="mr-10 sheikhtabarak-btn-main inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
}
