import { createSlice } from "@reduxjs/toolkit";
const initialUserValues = {
    uname:"",
    usurname:"",
    uaddress:"",
    uemail:"",
    uusername:"",
    uphone:"",
    uuplata:-1,
    urole:""
};
const userSlice = createSlice({
    name: 'user',
    initialState:initialUserValues,
    reducers:{
        setValues(state,action){
             state.uname=action.payload.name;
             state.usurname=action.payload.surname;
            state.uemail=action.payload.email;
            state.uaddress=action.payload.address;
             state.uusername=action.payload.username;
             state.uphone=action.payload.phone;
             state.uuplata=action.payload.uplata;
             state.urole=action.payload.role;
        },
        getValues(state)
        {
            return state;
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice.reducer;