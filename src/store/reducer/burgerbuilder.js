const ingredients_price={
    salad:1,
    meat:0.5,
    cheese:2,    
    bacon:3
}

const intialstate={
     ingredients:null//{
    //     salad:0,
    //     bacon:0,
    //     cheese:0,
    //     meat:0
    // }
    ,
    totalprice:4,
    error:false,
    building:false
}

const reducer=(state=intialstate,action)=>{
    switch(action.type){
        case("ADD_INGREDIENTS"):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.newingredient]:state.ingredients[action.newingredient] + 1
                },
                totalprice:state.totalprice + ingredients_price[action.newingredient],
                building:true
            }
        case("REMOVE_INGREDINTS"):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.newingredient]:state.ingredients[action.newingredient] - 1
                },
                totalprice:state.totalprice - ingredients_price[action.newingredient],
                building:true
            }
        case("SET_INGREDIENTS"):
            return{
                ...state,
                ingredients:action.ingredients,
                totalprice:4

            }
        case("ERROR"):
            return{

            }
        default:
            return state;

        }

}

export default reducer;