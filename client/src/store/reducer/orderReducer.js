const initialState = {
  OrderData: [

    {
      customer_id: 0,
      status: "Completed",
      customer_name: "Claira Marie",
      month: "September",
      date: "22",
      Year: "2023",
      total: "300",
      order_items: [

        {
          id: 1,
          name: "Western Style Hoodie",
          desc: "Test Description",
          category: 1,
          price: 4,
          quantity: 10,
        },
        {
          id: 1,
          name: "Nike Mercurial Vapor 13 Elite FG",
          desc: "Test Description",
          category: 1,
          price: 90,
          quantity: 3,
        },
      ],
    },
    {
      customer_id: 1,
      status: "Completed",
      customer_name: "Jeena Smith",
      month: "October",
      date: "09",
      Year: "2023",
      total: "120",
      order_items: [

        {
          id: "lqwe0rwermksds0ifsdfls",
          name: "WOMEN'S SINGLE-TRACK SHOE",
          desc: "WOMEN'S SINGLE-TRACK SHOE with heavy leather coated",
          image:
            "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-single-track-shoe-ALQF_JM3_hero.png",
          category: 0,
          price: 12,
          quantity: 5,
        },
        {
          id: "jimqwiewr9erweedfd",
          name: "Enduro Boa&reg; Hydration Pack",
          desc: "Enduro Boa&reg; Hydration Pack with bottled water",
          image:
            "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/enduro-boa-hydration-pack-AJQZ_JK3_hero.png",
          category: 2,
          price: 20,
          quantity: 3,
        },
      ],
    },

    {
      customer_id: 2,
      status: "Pending",
      customer_name: "John Smith",
      month: "November",
      date: "2",
      Year: "2023",
      total: "220",
      order_items: [
        {
          id: 2,
          name: "Nike Mercurial Vapor 13 Elite FG",
          desc: "Test Description",
          category: 1,
          price: 90,
          quantity: 2,
        },

        {
          id: 1,
          name: "Nike Mercurial Vapor 13 Elite FG",
          desc: "Test Description",
          category: 1,
          price: 20,
          quantity: 2,
        },
      ],
    },
    



    {
      customer_id: 3,
      status: "Completed",
      customer_name: "Jeena Smith",
      month: "December",
      date: "09",
      Year: "2023",
      total: "231",
      order_items: [
        {
          id: "lqwe0rwermksds0ifsdfls",
          name: "WOMEN'S SINGLE-TRACK SHOE",
          desc: "WOMEN'S SINGLE-TRACK SHOE with heavy leather coated",
          image:
            "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-single-track-shoe-ALQF_JM3_hero.png",
          category: 0,
          price: 12,
          quantity: 5,
        },
        {
          id: "jimqwiewr9erweedfd",
          name: "Enduro Boa&reg; Hydration Pack",
          desc: "Enduro Boa&reg; Hydration Pack with bottled water",
          image:
            "http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/enduro-boa-hydration-pack-AJQZ_JK3_hero.png",
          category: 2,
          price: 11,
          quantity: 1,
        },

        {
          id: 4,
          name: "Luxury Tripple Coated Hat",
          desc: "Test Description",
          category: 1,
          price: 8,
          quantity: 20,
        },
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
