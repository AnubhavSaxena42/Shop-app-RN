import React from 'react' 
import Card from '../UI/Card'
import {View,Text,Button,Image,StyleSheet,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native'
const Touchable = Platform.OS==='android'&&Platform.version>=21?TouchableNativeFeedBack:TouchableOpacity
const ProductItem = props => {
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
            <Touchable onPress={props.onSelect} useForeground>
            <Image style={styles.image}  source={{uri:props.image}}/>
            <View style={styles.details}>            
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
        </Touchable>
        </View>
        </Card>
    )
}
const styles=StyleSheet.create({
    product:{
        height:300,
        margin:20,
    },
    image:{
        width:'100%',
        height:'60%'
    },
    title:{
        fontSize:18,
        marginVertical:2,
        fontFamily:'open-sans-bold'
    },
    price:{
        fontSize:14,
        color:"#888",
        fontFamily:'open-sans'
    },
    actions:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:'25%',
        paddingHorizontal:20,
    },
    details:{
        alignItems:"center",
        height:'15%',
        padding:10,  
    },
    touchable:{
        overflow:'hidden',
        borderRadius:10,
    }
})

export default ProductItem