import React,{useEffect,useState,useCallback} from 'react' 
import {View,Text,Button,Platform,StyleSheet,FlatList,ActivityIndicator} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import { color } from 'react-native-reanimated'
const ProductsOverviewScreen = (props) =>{
    const [isLoading,setIsLoading] = useState(false) 
    const [error,setError]= useState()
    const dispatch = useDispatch();
    const loadProducts = useCallback(async ()=>{
        console.log('load products')
        setError(null)
        setIsLoading(true)
        try{
         dispatch(productActions.fetchProducts())
        }catch(err){
            setError(err.message)
        } 
        setIsLoading(false)
    },[dispatch,setError,setIsLoading])
    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadProducts)
        return ()=>{
            willFocusSub.remove()
        }
    },[loadProducts])
    useEffect(()=>{
        loadProducts();
    },[dispatch,loadProducts])
    const products = useSelector(state=>state.products.availableProducts);
    const selectItemHandler = (id,title) => {
        console.log('in here')
        props.navigation.navigate({routeName:'ProductDetail',params:{productId:id,productTitle:title}})
    }
    if(error){
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button title="try again" onPress={loadProducts} color={Colors.primary}/>
            </View>
        );
    }
    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    }
    if(!isLoading && products.length===0){
        return <View style={styles.centered}>
            <Text>No products found maybe start adding some!</Text>
        </View>
    }
    return <FlatList data={products} keyExtractor={item=>item.id} renderItem={(itemData)=><ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={()=>{selectItemHandler(itemData.item.id,itemData.item.title)}}
    >
    <Button color={Colors.primary} title="View Details" onPress={()=>{selectItemHandler(itemData.item.id,itemData.item.title)}}/>
    <Button color={Colors.primary} title="To Cart" onPress={()=>{dispatch(cartActions.addToCart(itemData.item))}}/>
    </ProductItem>}/>
}
const styles=StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
ProductsOverviewScreen.navigationOptions=(navData)=>{
    return {
        headerTitle:"All products",
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="CART" iconName={Platform.OS==='android'?'md-cart':'ios-cart'} onPress={()=>{navData.navigation.navigate({routeName:'Cart'})}}/>
        </HeaderButtons>,
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="MENU" iconName={Platform.OS==="android"?'md-menu':'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}/>
        </HeaderButtons>
    }
}
export default ProductsOverviewScreen