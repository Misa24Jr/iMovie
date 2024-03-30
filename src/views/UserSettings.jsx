import React, {useState} from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import UserInput from "../components/inputs/UserInput";

const UserSettings = () => {
    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState('misa24jr@gmail.com');
    const [password, setPassword] = useState('misa24jr');

    const toggleEdit = () => {
        setEdit(!edit);
    };

    const handleConfirmChanges = () => {
        setEdit(false);
    };
    
    return(
        <View style={style.container}>
            <HomeTemplateComponent />
            <View style={style.containerBody}>
                <View style={style.containerCard}>

                    <TouchableOpacity
                        onPress={toggleEdit}
                    >
                        <Text style={style.link}>Edit Profile</Text>
                    </TouchableOpacity>
                    
                    <View style={style.containerImage}>
                        <Image source={{uri: 'https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
                            style={{width: 120, height: 180}}
                        />
                        <Text style={style.name}>
                            Misa24jr
                        </Text>
                    </View>
                    <View style={style.containerInput}>
                        <UserInput name="Email" value={email}/>
                        <UserInput name="Password" value={password} secureTextEntry={true}/>

                        {edit && <TouchableOpacity 
                                    onPress={handleConfirmChanges}
                                    style={style.BtnSave}
                                >
                                <Text style={style.textSave}>Confirm Changes</Text>
                            </TouchableOpacity>}
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
        gap: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BtnSave:{
        width: 212,
        height: 40,
        backgroundColor: '#3C5252',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    textSave:{
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
    }
});

export default UserSettings;