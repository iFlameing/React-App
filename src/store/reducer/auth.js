import { updatedobj } from '../utility'

const intialstate={
    error:null,
    loading:false,
    token:null,
    localId:null,
    fail:false,
    redirect:false,

}
const authStart=(state,action)=>{
    return updatedobj(state,{loading:true})
}
const authFailed=(state,action)=>{
    return updatedobj(state,{fail:true,
        error:action.error,
        loading:false
    })
}
const authSuccess=(state,action)=>{
    return updatedobj(state,{
        fail:false,
        error:null,
        token:action.tokenId,
        localId:action.localId,
        loading:false,
    })
}

const logout=(state,action)=>{
    return updatedobj(state,{
        token:null,localId:null,logout:false
    })
}

const reducer =(state=intialstate,action)=>{
    switch(action.type){
        case("AUTH_START"):return authStart(state,action)//In this type you can also write reducer
        case("AUTH_FAILED"):return authFailed(state,action)//this look lean and it is easy to find in which
        case("AUTH_SUCCESS"):return authSuccess(state,action)//case what is happening
        case("LOGOUT"):return logout(state,action)
        default:return state;
    }
}

export default reducer;