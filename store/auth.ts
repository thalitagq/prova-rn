import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forgotPassword, loginUser, logoutUser, newPassword, signupUser } from "./api";

type User = {
  username?: string | null;
  email: Promise<string | null> | string | null;
  password: Promise<string | null> | string | null;
};

type InitialStateType = {
  user_id: number | null;
  user: User | null;
  status: "idle" | "loading" | "pending";
  error: string | null;
  token: Promise<string | null> | string | null;
  tokenPassword: string | null;
};

export type Error = {
  message: { response: { data: [{ message: string }] } }
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const storeDataObj = async (key: string, value:any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value as string
    }
  } catch (e) {
    console.log(e);
  }
}

export const getDataObj = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);  
  }
};

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

const initialState = () =>
  ({
    user_id: Number(getData("user_id")) || null,
    user: {
      email: getData("email") || null,
      password: getData("password"),
    },
    status: "idle",
    error: null,
    token: getData("token") || null,
    tokenPassword: null,
  } as InitialStateType);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.user = { ...action.payload };
      storeData("email", action.payload.email);
      storeData("password", action.payload.password);
    },
    logout: (state) => {
      state.user = { email: "", password: "" };
    },
    resetState: (state) => initialState()    
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {      
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user!.email = payload.email;
      state.token = payload.token.token;
      state.user_id = payload["user_id"].id;
      storeData("token", payload.token.token);
      storeData("email", payload.email);
      storeData("user_id", payload["user_id"].id.toString());
      state.status = "idle";
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {      
      state.error =
        payload?.message?.response.data[0].message ||
        "Não foi possível fazer o login";
      state.status = "idle";
    });

    builder.addCase(signupUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(signupUser.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Não foi possível realizar o cadastro";
      state.status = "idle";
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.tokenPassword = null;
    });

    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.tokenPassword = payload.data;
    });

    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Algo deu errado. Tente novamente";
      state.status = "idle";
    });

    builder.addCase(newPassword.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(newPassword.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Algo deu errado. Tente novamente";
      state.status = "idle";
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Algo deu errado. Tente novamente";
      state.status = "idle";
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
