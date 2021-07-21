import React from 'react' 
import {View,Text,StyleSheet,TouchableOpacity,Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
const CartItem = props => {

    return (
        <View style={styles.carditem}>
            <View style={styles.itemdata}>
                <Text style={styles.quantity}>{props.quantity} </Text><Text style={styles.maintext}>{props.title}</Text> 
            </View>
            <View style={styles.itemdata}>
                <Text style={styles.maintext}>${props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS==='android'?'md-trash':'ios-trash'} size={23} color="red"/>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    carditem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
    },
    itemdata:{
        flexDirection:'row',
        alignItems:'center',
    },
    quantity:{
        fontFamily:'open-sans',
        color:'#888',
        fontSize:16,
    },
    maintext:{
        fontSize:16,
        fontFamily:'open-sans-bold'
    },
    deleteButton:{
        marginLeft:20,
    }
})

export default CartItem

