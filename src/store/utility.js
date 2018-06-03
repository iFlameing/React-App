export const updatedobj=(oldstate,newvaluetostate)=>{
    return{
        ...oldstate,
        ...newvaluetostate
    }
}