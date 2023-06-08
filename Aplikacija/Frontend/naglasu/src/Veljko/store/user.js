import { createSlice } from "@reduxjs/toolkit";
const initialUserValues = {
    uname:"",
    usurname:"",
    uaddress:"",
    uemail:"",
    uusername:"",
    uphone:"",
    uuplata:-1,
    urole:"",
    uslika:"",
    uid:""
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
             state.uslika=action.payload.slika;
             state.uid=action.payload.id;
        },
        getValues(state)
        {
            return state;
        },
        resetValues(state) {
            state.uname = "";
            state.usurname = "";
            state.uemail = "";
            state.uaddress = "";
            state.uusername = "";
            state.uphone = "";
            state.uuplata = -1;
            state.urole = "";
            state.uslika = "";
          }
    }
});
export const userActions = userSlice.actions;
export default userSlice.reducer;