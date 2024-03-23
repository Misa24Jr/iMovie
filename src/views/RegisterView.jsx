import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { API_ROOT } from "@env";

// Components
import BtnRegister from "../components/button/BtnRegister";
import Title from "../components/others/Title";
import InitInput from "../components/inputs/InitInput";
import InitLink from "../components/others/InitLink";
import InputValidator from "../utils/inputValidators.js";

const RegisterView = () =>{

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState('gray');
    const [registerBtnDisabled, setRegisterBtnDisabled] = useState(true);

    const handleRegisterButtonClick = async () => { 
        if (!InputValidator.registerInputsValidation(email, nickname, password)) return;

        try {
            const response = await fetch(`${API_ROOT}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    nickname: nickname,
                    password: password
                })
            });

            if(response.status === 400) {
                const data = await response.json();
                return Alert.alert('Oops', `${data.message}, try again.`);
            }

            if(response.status !== 201 && response.status !== 400) {
                return Alert.alert('Oops', 'Unknown error in server, try again later.');
            } 

            Alert.alert('Success', 'You have been registered successfully.');

            return navigation.navigate('LoginView');
        } catch (error) {
            return Alert.alert('Error', 'Something went wrong trying to register.');
        }
    }

    useEffect(() => {
        if(email && nickname && password) setButton('#3C5252');
        else setButton('gray');

        if(email.length !== 0 && nickname .length !== 0 && password .length !== 0) {
            setRegisterBtnDisabled(false);
        } else setRegisterBtnDisabled(true);
    });

    return(
        <View style={style.container}>
            <View style={style.containerTitle}>
                <Title/>
            </View>
            <View style={style.containerInput}>
                <InitInput
                    name={'email'} 
                    placeholder={'ej. example@gmail.com'}
                    changeTextHandler={text => setEmail(text)}
                    secureEntry={false}
                    parentSetterFunction={setEmail}
                />
                <InitInput
                    name={'nickname'} 
                    placeholder={'ej. misa24jr'} 
                    max={10}
                    changeTextHandler={text => setNickname(text)}
                    secureEntry={false}
                    parentSetterFunction={setNickname}
                />
                <InitInput
                    name={'password'}
                    placeholder={'min. 8 characters'}
                    changeTextHandler={text => setPassword(text)}
                    secureEntry={true}
                    parentSetterFunction={setPassword}
                />
            </View>
            <View style={style.containerBtn}>
                <BtnRegister
                    text={'Register'}
                    clickHandler={handleRegisterButtonClick}
                    color={button}
                    disabled={registerBtnDisabled}
                />
                <InitLink 
                    text={"Already have an acount?"} 
                    clickHandler={() => navigation.navigate('LoginView')}
                />
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
      marginTop: 30,
      gap: 30,
  },
  containerBtn:{
      width: '100%',
      height: '20%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
      marginBottom: '20%',
  }
});

export default RegisterView;