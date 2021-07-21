import React from 'react' 
import {FlatList,Platform,Button,Alert} from 'react-native'
import {useSelector} from 'react-redux'
import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import {useDispatch} from 'react-redux'
import * as productActions from '../../store/actions/products'
const UserProductsScreen = props => {
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?','Do you really want to delete this item?',[
            {text:'No',style:'default'},
            {text:'Yes',style:'destructive',onPress:()=>{dispatch(productActions.deleteProduct(id))}}
        ])
    }
    const userProducts = useSelector(state=>state.products.userProducts)
    return (
        <FlatList data={userProducts} keyExtractor={item=>item.id} renderItem={itemData=><ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onSelect={()=>{props.navigation.navigate('EditProduct',{productId:itemData.item.id})}}>
            <Button color={Colors.primary} title="EDIT DETAILS" onPress={()=>{props.navigation.navigate('EditProduct',{productId:itemData.item.id})}}/>
            <Button color={Colors.primary} title="DELETE" onPress={deleteHandler.bind(this,itemData.item.id)}/>
        </ProductItem>}/>
    )
}
UserProductsScreen.navigationOptions=(navData)=>{
    return{ 
        headerTitle:"Your Products",
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="MENU" iconName={Platform.OS==="android"?'md-menu':'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}/>
        </HeaderButtons>,
        headerRight:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="ADD" iconName={Platform.OS==="android"?'md-create':'ios-create'} onPress={()=>{navData.navigation.navigate('EditProduct')}}/>
        </HeaderButtons>
    }
}

export default UserProductsScreen