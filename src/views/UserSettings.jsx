import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import UserInput from "../components/inputs/UserInput";

const UserSettings = () => {
    return(
        <View style={style.container}>
            <HomeTemplateComponent />
            <View style={style.containerBody}>
                <View style={style.containerCard}>
                    <Text style={style.link}>Edit Profile</Text>
                    <View style={style.containerImage}>
                        <Image source={{uri: 'https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
                            style={{width: 120, height: 180}}
                        />
                        <Text style={style.name}>
                            Misa24jr
                        </Text>
                    </View>
                    <View style={style.containerInput}>
                        <UserInput placeholder="misa24jr@gmail.com" name="Name"/>
                        <UserInput placeholder="***************" name="Email"/>
                    </View>
                </View>

            </View>
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        height: '100%',
        alignItems: 'center',
    },
    containerBody: {
        top: 150,
        width: '80%',
    },
    containerCard:{
        width: 330,
        height: 510,
        backgroundColor: '#1c1c1c',
        borderRadius: 20,
        padding: 20,
        gap: 50,
    },
    link:{
        color: '#3C5252',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
    },
    containerImage:{
        width: "100%",
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
    },
    name:{
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Jura_400Regular',
    },
    containerInput:{
        gap: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserSettings;