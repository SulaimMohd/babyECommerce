import { createSlice } from "@reduxjs/toolkit";


let initialState = {
  isAuth: JSON.parse(localStorage.getItem('isAuth'))|| false,
  userData:JSON.parse(localStorage.getItem('userData')) || null
}

const authSlice = createSlice({
  name:'authSlice',
  initialState,
  reducers:{
    logIn: (state, action)=>{
      state.isAuth = true;
      state.userData = action.payload
      console.log(state.userData)
      localStorage.setItem('isAuth', JSON.stringify(state.isAuth))
      localStorage.setItem('userData', JSON.stringify(state.userData))
    },
    logOut: (state, action)=>{
      state.isAuth = false,
      state.userData = null
      localStorage.removeItem('isAuth')
      localStorage.removeItem('userData')
    }
  }
})
export const { logIn, logOut } = authSlice.actions
export default authSlice.reducer