import React, {useState} from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import UserInput from "../components/inputs/UserInput";
import ModalPop from "../components/containers/ModalPop";

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

                        <View>
                            <Image source={{uri: 'https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
                                style={{width: 120, height: 180}}
                            />
                            {edit && 
                            <TouchableOpacity>
                                <Text style={style.BtnChange}>Change</Text>
                            </TouchableOpacity>}
                        </View>

                        <Text style={style.name}>
                            Misa24jr
                        </Text>
                    </View>

                    <View style={style.containerInput}>
                        <UserInput name="Email" value={email} editable={false}/>
                        <UserInput name="Password" value={password} secureTextEntry={true} editable={false}/>

                        {edit && <TouchableOpacity 
                                    onPress={handleConfirmChanges}
                                    style={style.BtnSave}
                                >
                                <Text style={style.textSave}>Confirm Changes</Text>
                            </TouchableOpacity>}
                    </View>

                        {edit && <TouchableOpacity style={style.textDelete}>
                                    <Text style={style.linkDelete}>I want to delete my profile</Text>
                                </TouchableOpacity>}
                </View>
            </View>
            <ModalPop body={'Are yo sure you want to delete your profile?'}/>
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
        fontFamily: 'Jura_400Regular'
    },
    linkDelete:{
        color: '#ff0000',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
    },
    containerImage:{
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    name:{
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Jura_400Regular',
    },
    containerInput:{
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BtnSave:{
        width: 212,
        height: 40,
        backgroundColor: '#3C5252',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    textSave:{
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
    },
    textDelete:{
        alignItems: 'flex-end',
    },
    BtnChange:{
        color: '#3C5252',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
        textAlign: 'center',
    }
});

export default UserSettings;