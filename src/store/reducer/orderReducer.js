const initialState = {
  OrderData: [
    {
      customer_id: 0,
      status: "Pending",
      customer_name: "John Smith",
      date: "Jan 12",
      total:"1100",
      order_items: [
        {
            id: 2,
            name: "Nike Mercurial Vapor 13 Elite FG",
            desc: "Test Description",
            category: 1,
            price: 800,
            quantity: 2,
           
          },

        {
            id: 1,
            name: "Nike Mercurial Vapor 13 Elite FG",
            desc: "Test Description",
            category: 1,
            price: 300,
            quantity: 2,
           
          },

        

      ],
     
    },
    {
      customer_id: 2,
      status: "Completed",
      customer_name: "William",
      date: "Jan 12",
      total:"300",
      order_items: [
        {
            id: 1,
            name: "Nike Mercurial Vapor 13 Elite FG",
            desc: "Test Description",
            category: 1,
            price: 300,
            quantity: 1,
           
          }
      ],
     
    },


    
  ],
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default OrderReducer;
