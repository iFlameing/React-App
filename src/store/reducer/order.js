import { updatedobj } from '../utility'

// You have to impore more as you have to make oneline switch case use utility.js in 
// in every case .

const initialstate={
    order:[],
    loading:false,
    purchased:false
}

const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case("PURCHSAED_SUCCESS"):
        return{
            ...state,
            loading:false,
            purchased:true

        }
        case("PURCHASED_FAILED"):
        return{
            loading:false
        }
        case("PURCHASE_START"):
            return{
                ...state,
                loading:true
            }
        case("REDIRECT"):
        return{
            ...state,
            purchased:false,
            
        }
        case("ORDER_RETRIEVE_SUCCESS"):
        return{
            ...state,
            order:action.order,
            loading:false
        }
        case("ORDER_START"):return updatedobj(state,{loading:true})
         // {
           // ...state,
           //loading:true You can also refactor reducer as you seen above with simp
           // le import we make the changes and the reducer became one line.
            
        //}
        case("ORDER_RETRIEVE_FAILED"):return updatedobj(state,{loading:false})
        default:
            return state;
    }
}

export default reducer;