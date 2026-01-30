import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  birthday: string;
  nationality: string;
  citizenId: string;
  gender: string;
  mobilePhonePrefix: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
}

interface FormDataState {
  userList: UserData[];
  form: Omit<UserData, "id"> & { id?: string };
}

const initialState: FormDataState = {
  userList: [],
  form: {
    id: "",
    title: "",
    firstName: "",
    lastName: "",
    birthday: "",
    nationality: "",
    citizenId: "",
    gender: "",
    mobilePhonePrefix: "+66",
    mobilePhone: "",
    passportNo: "",
    expectedSalary: "",
  },
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateField: <T extends keyof (Omit<UserData, "id"> & { id?: string })>(
      state: FormDataState,
      action: PayloadAction<{
        field: T;
        value: (Omit<UserData, "id"> & { id?: string })[T];
      }>,
    ) => {
      state.form[action.payload.field] = action.payload.value;
    },
    createUser: (state) => {
      if (state.form.id) {
        const index = state.userList.findIndex((u) => u.id === state.form.id);
        if (index !== -1) {
          state.userList[index] = { ...state.form } as UserData;
        }
      } else {
        const newUser = {
          ...state.form,
          id: Date.now().toString(),
        } as UserData;
        state.userList.push(newUser);
      }
      state.form = { ...initialState.form };
      if (typeof window !== "undefined") {
        localStorage.setItem("userList", JSON.stringify(state.userList));
      }
    },
    updateUser: (state, action: PayloadAction<UserData>) => {
      const index = state.userList.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.userList[index] = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("userList", JSON.stringify(state.userList));
        }
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.userList = state.userList.filter((u) => u.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("userList", JSON.stringify(state.userList));
      }
    },
    resetForm: (state) => {
      state.form = { ...initialState.form };
    },
    setForm: (
      state,
      action: PayloadAction<Omit<UserData, "id"> & { id?: string }>,
    ) => {
      state.form = { ...action.payload };
    },
    loadUsers: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("userList");
        if (saved) {
          state.userList = JSON.parse(saved);
        }
      }
    },
  },
});

export const {
  updateField,
  createUser,
  updateUser,
  deleteUser,
  resetForm,
  setForm,
  loadUsers,
} = formDataSlice.actions;

export default formDataSlice.reducer;
