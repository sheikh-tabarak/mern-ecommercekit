const AddProductValidator=(NewProduct)=>{
    if(NewProduct.name.trim().length===0)
    {
     return new Error("Title / Name  cannot be empty");
    
    }

    if(NewProduct.desc.trim().length===0)
    {
    return  new Error("Description  cannot be empty");
    }

    if(parseInt(NewProduct.price)===0 || !NewProduct.price)
    {
        return new Error("Price must be >0 ");
    }

    if(parseInt(NewProduct.stock)===0 || !NewProduct.stock)
    {
        return new Error("Stock/Quantity must be > 0");
    }
};

export default AddProductValidator;