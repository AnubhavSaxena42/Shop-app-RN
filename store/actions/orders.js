export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cartItems,totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const response = await fetch('https://shop-project-bd954-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })
        if(!response.ok){
            throw new Error('Something went wrong')
        }
        const resData =  await response.json()


        dispatch({
            type:ADD_ORDER,
            orderData:{id:resData.name,items:cartItems,amount:totalAmount,date:date}
        });
    }
    
}