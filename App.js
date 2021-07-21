
import React,{useState} from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {Provider} from 'react-redux'
import productsReducer from './store/reducers/products'
import ShopNavigator from './navigation/ShopNavigator'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
const rootReducer = combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer
})
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
const store=createStore(rootReducer,applyMiddleware(ReduxThunk))
export default function App(){
  const [fontLoaded,isFontLoaded] = useState(false)
  if(!fontLoaded)
  return <AppLoading startAsync={fetchFonts} onFinish={()=>{isFontLoaded(true)}} onError={(err)=>{console.log(err)}}/>
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  )
}
