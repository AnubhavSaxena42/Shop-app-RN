export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const SET_PRODUCTS = "SET_PRODUCTS"
import Product from '../../models/product'
export const fetchProducts = () => {
    return async dispatch => {
        try {
        const response = await fetch('https://shop-project-bd954-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
        if(!response.ok){
            throw new Error('Something went wrong!')
        }
        const resData =  await response.json()
        const loadedProducts = [];
        for (const key in resData){
            loadedProducts.push(new Product(
                key,
                'u1',
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price
            ))
        }
        dispatch({type:SET_PRODUCTS,products:loadedProducts})
        }catch(error){
            //send to custom analytics server 
            throw error
        }
    }
}
export const deleteProduct = (productId) => {
    return async dispatch => {
        const response = await fetch(`https://shop-project-bd954-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`,{
            method:'DELETE',
        })
        if(!response.ok){
            throw new Error('Something Went wrong')
        }
        dispatch({type:DELETE_PRODUCT,pid:productId})
    } 
}

export const createProduct = (title,description,imageUrl,price) => {
    return async dispatch => {
        //any async code you want!
        const response = await fetch('https://shop-project-bd954-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })

        const resData =  await response.json()
        console.log(resData);
        dispatch( {type:CREATE_PRODUCT,productData:{
            id:resData.name, 
            title,
            description,
            imageUrl,
            price
         }})
    }
}
export const updateProduct = (id,title,description,imageUrl) => {
    return async dispatch => {
            const response = await fetch(`https://shop-project-bd954-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
            })
        })
        if(!response.ok){
            throw new Error('Something went wrong')
        }
        dispatch({type:UPDATE_PRODUCT,
            pid:id,
            productData:{
            title,
            description,
            imageUrl,
        }})
    }   
}