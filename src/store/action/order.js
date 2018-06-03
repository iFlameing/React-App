import axios from '../../axios-order'

 const purchasedbuger=(id,orderData)=>{
    return{
        type:'PURCHSAED_SUCCESS',
        id:id,
        orderData:orderData
    }
}

const purchadedfailed=(error)=>{
    console.log(error)
    return{
        type:"PURCHASED_FAILED"
    }
}

const purchaseStart=()=>({
    type:"PURCHASE_START"
})

export const purchaseBurger=(orderData,token)=>(
    dispatch=>{
            dispatch(purchaseStart())
        axios.post('/orders.json?auth='+token,orderData)
                        .then(response => {
                            dispatch(purchasedbuger(response.data,orderData))
                        }
                        )
                        .catch(error => {
                            dispatch(purchadedfailed())
                            
                        } )

    }
)

export const purchasedredirect=()=>({
    type:"REDIRECT"
})


 const orderStart=()=>({
    type:"ORDER_START"
})

const orderretrievesuccess=(order)=>({
    type:"ORDER_RETRIEVE_SUCCESS",
    order:order
})

const orderretrieveFailed=()=>({
    type:"ORDER_RETRIEVE_FAILED",
})

export const orderretrieve=(token,localId)=>( 
    dispatch=>{
        dispatch(orderStart())
        const queryparams='?auth='+token +'&orderBy="userId"&equalTo="'+localId+'"'
        axios.get('/orders.json'+queryparams)
        .then(res=>{
            const fetchorders=[];
            for(let key in res.data){
                fetchorders.push({
                    ...res.data[key],
                    id:key
                })}
                dispatch(orderretrievesuccess(fetchorders)) 
        })
        .catch(error=>{
            console.log(error)
            dispatch(orderretrieveFailed())
        })

    }
)