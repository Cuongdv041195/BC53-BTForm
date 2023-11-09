import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [
    {
      id: "1",
      name: "Đặng Văn Cường",
      phone: "0123456789",  
      email:
        "Cuongdv@gmail.com"
    },
    // {
    //   id: "2",
    //   name: "Kim Ngân",
    //   phone: "0908422564",  
    //   email:
    //     "Ngan1512@gmail.com"
    // },
    // {
    //   id: "3",
    //   name: "Thùy Dương",
    //   phone: "02839916466",  
    //   email:
    //     "Cuongdv041195@gmail.com"
    // },
  ],
  studentEdit: undefined,
};

const BTFormSlice = createSlice({
  name: "BTForm",
  initialState,
  reducers: {
    addStudent: (state, { payload }) => {
      // console.log("payload: ", payload);
      state.studentList.push(payload);
    },
    deleteStudent: (state, { payload }) => {
      // console.log("payload: ", payload);
      state.studentList = state.studentList.filter(
        (value) => value.id !== payload
      );
    },
    setStudentEdit: (state, { payload }) => {
      // console.log("payload: ", payload);
      state.studentEdit = payload;
    },
    editStudent: (state, { payload }) => {
      // console.log("payload: ", payload);
      // Tim cái sản phẩm đang được chỉnh sửa
      const studentIndex = state.studentList.findIndex(
        (item) => item.id === payload.id
      );

      // Khi mà không tìm thấy sản phẩm dựa vào id thì productIndex sẽ là -1
      if (studentIndex !== -1) {
        // CẬp nhật lại sản phẩm mới từ người dùng nhập vào
        // console.log("Sản phẩm được tìm thấy", productIndex);
        state.studentList[studentIndex] = payload;
        state.studentEdit = undefined;
      }
    },
  },
});

export const { reducer: btFormReducer, actions: btFormActions } = BTFormSlice;
