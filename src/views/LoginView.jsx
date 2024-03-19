import React from "react";
import { View, StyleSheet, TextInput} from "react-native";

// Components
import BtnLogin from "../components/button/BtnLogin";
import Title from "../components/others/Title";
import Input from "../components/inputs/Input";

const LoginView = () =>{

    return(
        <View style={style.container}>
            
            <View style={style.containerTitle}>
                <Title/>
            </View>

            <View style={style.containerInput}>
                <Input name={'nickname'} placeholder={'ej. misa24jr'} max={10}/>
                <Input name={'password'} placeholder={'min. 8 characters'} max={8}/>
            </View>

            <View style={style.containerBtn}>
                <BtnLogin text={'Login'}/>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#151515',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerTitle:{
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerInput:{
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 40,
    },
    containerBtn:{
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });
  
export default LoginView;