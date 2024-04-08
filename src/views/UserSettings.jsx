import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import UserInput from "../components/inputs/UserInput";
import ModalPop from "../components/containers/ModalPop";

const UserSettings = () => {
    const [email, setEmail] = useState('misa24jr@gmail.com');
    const [password, setPassword] = useState('misa24jr');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(true); // Estado para controlar si mostrar el password o no

    const toggleEdit = () => {
        setIsEditing(!isEditing); // Cambiar el estado de edición
        setShowPassword(false); // Al editar, ocultar el password
    };

    const handleConfirmChanges = () => {
        setIsEditing(false); // Desactivar la edición cuando se confirman los cambios
        setShowPassword(true); // Mostrar el password nuevamente después de confirmar los cambios
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible); // Cambiar la visibilidad del modal
    };

    const handleClose = () => {
        setIsModalVisible(false); // Cerrar el modal
    };

    return (
        <View style={styles.container}>
            <HomeTemplateComponent />
            <View style={styles.containerBody}>
                <View style={styles.containerCard}>
                    <TouchableOpacity onPress={toggleEdit}>
                        <Text style={styles.link}>Edit Profile</Text>
                    </TouchableOpacity>
                    <View style={styles.containerImage}>
                        <View>
                            <Image source={{ uri: 'https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                                style={{ width: 120, height: 180 }}
                            />
                        </View>
                        <Text style={styles.name}>
                            Misa24jr
                        </Text>
                    </View>
                    <View style={styles.containerInput}>
                        <UserInput
                            name="Email"
                            value={email}
                            editable={isEditing}
                            onChangeText={setEmail}
                        />
                        <UserInput
                            name="Password"
                            value={password}
                            secureTextEntry={showPassword} // Usar showPassword para controlar si es seguro o no
                            editable={isEditing}
                            onChangeText={setPassword}
                        />
                        {isEditing && (
                            <TouchableOpacity onPress={handleConfirmChanges} style={styles.BtnSave}>
                                <Text style={styles.textSave}>Confirm Changes</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {isEditing && (
                        <TouchableOpacity style={styles.textDelete} onPress={toggleModal}>
                            <Text style={styles.linkDelete}>I want to delete my profile</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <ModalPop
                handleClose={handleClose}
                visible={isModalVisible}
                toggleModal={toggleModal}
                body={'Are you sure you want to delete your profile?'}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        height: '100%',
        alignItems: 'center',
    },
    containerBody: {
        top: 150,
    },
    containerCard: {
        width: 330,
        height: 510,
        backgroundColor: '#1c1c1c',
        borderRadius: 20,
        padding: 20,
        gap: 50,
    },
    link: {
        color: '#3C5252',
        fontSize: 12,
        fontFamily: 'Jura_400Regular'
    },
    linkDelete: {
        color: '#ff0000',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
    },
    containerImage: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    name: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Jura_400Regular',
    },
    containerInput: {
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BtnSave: {
        width: 212,
        height: 40,
        backgroundColor: '#3C5252',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    textSave: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
    },
    textDelete: {
        alignItems: 'flex-end',
    },
});

export default UserSettings;
