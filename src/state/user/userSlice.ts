import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToken } from "../app/appSlice";

export interface IAsset {
  token: IToken;
  balance: string;
}
export interface IUserState {
  address: string;
  token: string;
  network: number;
  wallet: IAsset[];
  balance: string;
  isAuthenticated: boolean;
  signature: string,
  createdAt: Date,
  expiredTime: Date,
}

export const initialUserState : IUserState = {
  address: "",
  token: "",
  network: -1,
  wallet: [],
  balance: "0",
  isAuthenticated: false,
  signature: "",
  createdAt: new Date(),
  expiredTime: new Date(),

}

interface IPayloadUpdateToken {
  token: string;
  expiredTime : Date
}

const userSlice = createSlice({
  name: "userState",
  initialState: initialUserState,
  reducers: {
    saveInfo: (state, action: PayloadAction<IUserState>) => {
      state = action.payload;
      return state
    },
    clearInfo: (state, action: PayloadAction<undefined>) => {
      state = initialUserState;
      return state;
    },
    updateToken: (state, action: PayloadAction<IPayloadUpdateToken>) => {
      state.token = action.payload.token;
      state.expiredTime = action.payload.expiredTime;
      return state
    }
  },
});

export const { saveInfo, clearInfo, updateToken } = userSlice.actions;

export default userSlice.reducer;
