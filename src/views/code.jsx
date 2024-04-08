import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";

// Components
import ModalPop from "./ModalPop";

const MyReviewBox = ({url, description, rating}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Aquí podrías guardar la descripción editada en tu estado o enviarla a la función de guardado
    };

    return(
        <>
            <View style={style.containerBox}>
                <View style={style.containerImage}>
                    <View style={style.containerButton}>
                        {/* Botón de lápiz para editar */}
                        <TouchableOpacity onPress={handleEdit}>
                            <Image
                                source={require('../../../assets/pencil.png')}
                                style={{width: 35, height: 35}}
                            />
                        </TouchableOpacity>
                        {/* Botón de basura para eliminar */}
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                source={require('../../../assets/trash.png')}
                                style={{width: 35, height: 35}}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Mostrar la descripción como un TextInput editable si está en modo de edición */}
                    {isEditing ? (
                        <TextInput
                            style={style.descriptionInput}
                            value={editedDescription}
                            onChangeText={setEditedDescription}
                            multiline={true}
                        />
                    ) : (
                        <Text style={style.description}>{editedDescription}</Text>
                    )}
                </View>

                <View style={style.containerdescription}>
                    {/* Aquí puedes mostrar el rating u otra información si lo deseas */}
                    <View style={style.containerRating}>
                        <Text style={style.rating}>Rating: {rating}/5</Text>
                    </View>
                </View>
            </View>
            <ModalPop handleClose={handleClose} visible={isModalVisible} toggleModal={toggleModal} body={'Are you sure you want to delete this review?'}/>
        </>
    )
};

const style = StyleSheet.create({
    containerBox: {
        backgroundColor: '#1c1c1c',
        width: '100%',
        height: 255,
        borderRadius: 20,
        marginTop: 10,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerImage: {
        width: '100%',
        height: '60%',
    },
    description: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'justify',
    },
    descriptionInput: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'justify',
        padding: 5,
        minHeight: 50,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
    },
    containerRating:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rating:{
        color: '#A1A1A1',
        fontSize: 10,
    },
    containerButton:{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute', 
        top: 5, 
        padding: 5, 
        borderRadius: 5, 
        zIndex: 1,
        gap: 10,
    }
});

export default MyReviewBox;
