//working fine 
//common axios is working 
//use that 
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../axios.jsx';

// Rehydrate user from localStorage on page refresh
let persistedUser = null;
try {
  const raw = localStorage.getItem('cc_user');
  if (raw) persistedUser = JSON.parse(raw);
} catch (_) {}
export const loginUser=createAsyncThunk('loginUser',async(data)=>{
    const response = await axios.post("/api/user/login",data);
    return response.data;
}) 

export const logoutUser=createAsyncThunk('logoutUser',async()=>{
    await axios.get("/api/user/logout");
    return true;
})


const authSlice=createSlice({
    name:'authUser',
    initialState: {
        user: persistedUser,
        status: 'idle',
      },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state,action)=>{
            state.request=true;
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.request=false;
            state.status='succeded';
            state.error=false;
            state.success=true;
            state.user = action.payload;
            try { localStorage.setItem('cc_user', JSON.stringify(action.payload)); } catch (_) {}
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.request=false;
            state.error=true;
            state.success=false;
        })
        builder.addCase(logoutUser.pending,(state,action)=>{
            state.request=true;
        })
        builder.addCase(logoutUser.fulfilled,(state,action)=>{
            state.request=false;
            state.error=false;
            state.success=false;
            state.user = null;
            try { localStorage.removeItem('cc_user'); } catch (_) {}
        })
        builder.addCase(logoutUser.rejected,(state,action)=>{
            state.request=false;
            state.error=true;
            state.success=false;
        })
    }
})

export default authSlice.reducer;