import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { API_ROOT } from "@env";

// Components
import { getAndSetToken } from "../../utils/tokenHandler.js";
import StarRating from "./StartRating";
import ModalReview from "./ModalReview";
import ModalPop from "./ModalPop.jsx";


const MyReviewBox = ({movieId, poster, url, description, rating}) => {
    const [token, setToken] = useState('');
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

    const handleEdit = async () => {
        setIsEditing(prevEditing => !prevEditing);
        if(isEditing){
            try {
                const response = await fetch(`${API_ROOT}/api/reviews/updateContent`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        newContent: editedDescription,
                        movieId: movieId
                    })
                });

                if(response.status !== 200) return Alert.alert('Oops', 'Error response from server.');
                return;
            } catch (error) {
                return Alert.alert('Oops', 'Something went wrong trying to edit your review.');
            }
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        // Aquí podrías guardar la descripción editada en tu estado o enviarla a la función de guardado
    };

    useEffect(() => {
        getAndSetToken(setToken);
    }, []);

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
                </View>
                <View style={style.containerRating}>
                        {isEditing ? (
                            <StarRating fontSize={15} emptyStarColor={'white'}/>
                        ) : (
                            <Text style={style.rating}>Rating: {rating}/5</Text>
                        )}
                        
                    </View>
            </View>
            <ModalPop handleClose={handleClose} visible={isModalVisible} toggleModal={toggleModal} body={'Are yo sure you want to delete this review?'}/>
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
        marginBottom: 25,
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
        top: 10,

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
        right: 10,
        bottom: 10,
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
