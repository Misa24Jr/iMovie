import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";

// Components
import StarRating from "./StartRating";
import ModalReview from "./ModalReview";


const MyReviewBox = ({poster, url, description, rating}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedUrl, setEditedUrl] = useState(url);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleEdit = () => {
        setIsEditing(prevEditing => !prevEditing);
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
                        <TouchableOpacity onPress={handleEdit}>
                            <Image
                                source={isEditing ? require('../../../assets/check.png') : require('../../../assets/pencil.png')}
                                style={{width: 35, height: 35}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                source={require('../../../assets/trash.png')}
                                style={{width: 35, height: 35}}
                            />
                        </TouchableOpacity>
                    </View>

                    <Image 
                        key={url}
                        style={style.Image}
                        source={{uri: poster}}
                    />
                </View>

                <View style={style.containerdescription}>
                {isEditing ? (
                        <TextInput
                            style={style.description}
                            value={editedDescription}
                            onChangeText={setEditedDescription}
                            multiline={true}
                        />
                    ) : (
                        <Text style={style.description}>{editedDescription}</Text>
                    )}
                    <View style={style.containerRating}>
                        {isEditing ? (
                            <StarRating fontSize={15} emptyStarColor={'white'}/>
                        ) : (
                            <Text style={style.rating}>Rating: {rating}/5</Text>
                        )}
                        
                    </View>
                </View>
            </View>
            <ModalReview handleClose={handleClose} visible={isModalVisible} toggleModal={toggleModal} body={'Are yo sure you want to delete this review?'}/>
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
    Image:{
        width: '100%',
        height: '100%',
    },
    containerdescription: {
        width: '90%',
        height: '40%',
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'justify',
        paddingBottom: 10,
    },
    containerRating:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingBottom: 10,
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
