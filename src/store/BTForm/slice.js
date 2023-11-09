import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [
    {
      id: "1",
      name: "Đặng Văn Cường",
      phone: "0938371259",  
      email:
        "Cuongdv041195@gmail.com"
    },
    {
      id: "2",
      name: "Kim Ngân",
      phone: "0908422564",  
      email:
        "Ngan1512@gmail.com"
    },
    {
      id: "3",
      name: "Thùy Dương",
      phone: "02839916466",  
      email:
        "Cuongdv041195@gmail.com"
    },
  ],
  productEdit: undefined,
};

const BTFormSlice = createSlice({
  name: "BTForm",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      // console.log("payload: ", payload);
      state.productList.push(payload);
    },
    deleteProduct: (state, { payload }) => {
      // console.log("payload: ", payload);
      state.productList = state.productList.filter(
        (value) => value.id !== payload
      );
    },
    setProductEdit: (state, { payload }) => {
      // console.log("payload: ", payload);
      state.productEdit = payload;
    },
    editProduct: (state, { payload }) => {
      // console.log("payload: ", payload);
      // Tim cái sản phẩm đang được chỉnh sửa
      const productIndex = state.productList.findIndex(
        (item) => item.id === payload.id
      );

      // Khi mà không tìm thấy sản phẩm dựa vào id thì productIndex sẽ là -1
      if (productIndex !== -1) {
        // CẬp nhật lại sản phẩm mới từ người dùng nhập vào
        // console.log("Sản phẩm được tìm thấy", productIndex);
        state.productList[productIndex] = payload;
        state.productEdit = undefined;
      }
    },
  },
});

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice;
