import axios from '../../axios-order'

export const addIngredient=(name)=>{
    return {
        type:"ADD_INGREDIENTS",
        newingredient:name
    }
}
export const removeIngredient=(name)=>{
    return{
        type:"REMOVE_INGREDINTS",
        newingredient:name            

    }
}

const setIngredints=(ingredients)=>({
    type:"SET_INGREDIENTS",
    ingredients:ingredients
})

const error=()=>({
    type:"ERROR"
})

export const initIngredients=()=>(
    dispatch=>{ //Here we generally return the object 
        //but as we have to make async request we have to do like this to get execut the async code
        //redux-thunk provide this method It generally block the original diapatch send the new dispatch after performing the async .
        axios.get('https://my-first-react-app-84542.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIngredints(response.data))//for this just make the action creator as you dispatch that you handle in your reducers.
        })
        .catch(res=>{
            dispatch(error())
        })
    }
)