import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService';
import {toast} from "react-toastify"

const initialState = {
    isLoggedIn:false,
    user:null,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}
//Register User

export const register = createAsyncThunk(
    "auth/register",
    async (userData,thunkAPI) =>{
        try {
            return await authService.register(userData);
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state){
        state.isError=false
        state.isLoading=false
        state.isSuccess=false
        state.message=""
    }
  },
  extraReducers:(builder) =>{
    builder
       //register user
       .addCase(register.pending,(state)=>{
          state.isLoading = true;
       })
       .addCase(register.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.isLoggedIn=true;
         state.user = action.payload;
         toast.success("Registration SuccessFull")
       })
       .addCase(register.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message=action.payload;
        state.user = null;
        toast.success(action.payload)
      })
      //Login User
      .addCase(login.pending,(state)=>{
        state.isLoading = true;
     })
     .addCase(login.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isSuccess = true;
       state.isLoggedIn=true;
       state.user = action.payload;
       toast.success("Login SuccessFull")
     })
     .addCase(login.rejected,(state,action)=>{
      state.isLoading = false;
      state.isError = true;
      state.message=action.payload;
      state.user = null;
      toast.success(action.payload)
    })
    //Logout user
   
    .addCase(logout.pending,(state)=>{
      state.isLoading = true;
   })
   .addCase(logout.fulfilled,(state,action)=>{
     state.isLoading = false;
     state.isSuccess = true;
     state.isLoggedIn=false;
     state.user = null;
     toast.success(action.payload)
   })
   .addCase(logout.rejected,(state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message=action.payload;
    toast.success(action.payload)
  })
  //getLoginStatus
    .addCase(getLoginStatus.pending,(state)=>{
      state.isLoading = true;
   })
   .addCase(getLoginStatus.fulfilled,(state,action)=>{
     state.isLoading = false;
     state.isSuccess = true;
     state.isLoggedIn=action.payload;
     console.log(action.payload);
     if(action.payload.message === "invalid signature"){
      state.isLoggedIn = false;
     }
   })
   .addCase(getLoginStatus.rejected,(state,action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message=action.payload;
    
  })
  //get User
  .addCase(getUser.pending,(state)=>{
    state.isLoading = true;
 })
 .addCase(getUser.fulfilled,(state,action)=>{
   state.isLoading = false;
   state.isSuccess = true;
   state.isLoggedIn= true;
   state.user = action.payload
   console.log(action.payload);
  
 })
 .addCase(getUser.rejected,(state,action)=>{
  state.isLoading = false;
  state.isError = true;
  state.message=action.payload;
  toast.error(action.payload);
  
})
 //updateUser
 .addCase(updateUser.pending,(state)=>{
  state.isLoading = true;
})
.addCase(updateUser.fulfilled,(state,action)=>{
 state.isLoading = false;
 state.isSuccess = true;
 state.isLoggedIn= true;
 state.user = action.payload
 toast.success("User Changed Succesfully")
 console.log(action.payload);

})
.addCase(updateUser.rejected,(state,action)=>{
state.isLoading = false;
state.isError = true;
state.message=action.payload;
toast.error(action.payload);

})
 //updatePhoto
 .addCase(updatePhoto.pending,(state)=>{
  state.isLoading = true;
})
.addCase(updatePhoto.fulfilled,(state,action)=>{
 state.isLoading = false;
 state.isSuccess = true;
 state.isLoggedIn= true;
 state.user = action.payload
 toast.success("User Photo Changed")
 console.log(action.payload);

})
.addCase(updatePhoto.rejected,(state,action)=>{
state.isLoading = false;
state.isError = true;
state.message=action.payload;
toast.error(action.payload);

})

  }
});


//Login User

export const login = createAsyncThunk(
  "auth/login",
  async (userData,thunkAPI) =>{
      try {
          return await authService.login(userData);
      } catch (error) {
          const message = (
              error.response && error.response.data && error.response.data.message
          ) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message)
      }
  }
)

//Logout user 

export const logout = createAsyncThunk(
  "auth/logout",
  async(_,thunkAPI)=>{
    try{
      return await authService.logout();
    }
    catch(error){
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)
// getLoginStatus
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async(_,thunkAPI)=>{
    try{
      return await authService.getLoginStatus();
    }
    catch(error){
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// getUser

export const  getUser = createAsyncThunk(
  'auth/getUser',
  async(_,thunkAPI)=>{
    try{
      return await authService.getUser();
    }
    catch(error){
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update User

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async(userData,thunkAPI) =>{
    try {
      return await authService.updateUser(userData)
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update Photo
export const updatePhoto = createAsyncThunk(
  "auth/updatePhoto",
  async(userData,thunkAPI) =>{
    try {
      return await authService.updatePhoto(userData)
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const {RESET_AUTH} = authSlice.actions;

export const selectUser =  (state) =>state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer