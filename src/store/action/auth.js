import axios from 'axios'

const start=()=>({
    type:'AUTH_START'
})

const sucess=(token,localId)=>({
    type:"AUTH_SUCCESS",
    tokenId:token,
    localId:localId,
})

const failed=(error)=>({
    type:'AUTH_FAILED',
    error:error
})

const checktimeout=(timeout)=>(
    dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },(timeout*1000))
    }
)

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('localId')
    localStorage.removeItem('expiresDate')
    return{
        type:'LOGOUT'   
    }
}

export const auth=(data,isSignup)=>(
    dispatch=>{
        const dataon={
            ...data, returnSecureToken: true
        }
    
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAAlz42f8r1_UuO_sxWk1AZvqv0JM-xArw'
        if(!isSignup){
         url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAAlz42f8r1_UuO_sxWk1AZvqv0JM-xArw'
        }
        dispatch(start())
        axios.post(url,dataon)
        .then(response=>{
        
            const expiresDate=new Date(new Date().getTime() +  response.data.expiresIn*1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('localId',response.data.localId)
            localStorage.setItem('expiresDate',expiresDate)
            dispatch(sucess(response.data.idToken,response.data.localId))
            dispatch(checktimeout(response.data.expiresIn))
        })
        .catch(err=>{
            dispatch(failed(err.response.data.error.message))
        })
    }
)


export const authCheckState=()=>(
    dispatch=>{
        const token=localStorage.getItem('token')
        const localId=localStorage.getItem('localId')
        const expiresDate=new Date(localStorage.getItem('expiresDate'))
        if(!token){
            dispatch(logout)
        }
        else{
            if(expiresDate > new Date()){
                dispatch(sucess(token,localId))
                dispatch(checktimeout((expiresDate.getTime()-new Date().getTime())/1000))
            }
            else{
                dispatch(logout)
            }
        }
    }
)