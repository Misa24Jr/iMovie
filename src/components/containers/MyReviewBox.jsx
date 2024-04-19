import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { API_ROOT } from "@env";

// Components
import { getAndSetToken } from "../../utils/tokenHandler.js";
import StarRating from "./StartRating";
import ModalPop from "./ModalPop.jsx";

const MyReviewBox = ({movieId, poster, url, description, rating}) => {
    const [token, setToken] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Nuevo estado para controlar si se está procesando una operación
    const [editedDescription, setEditedDescription] = useState(description);
    const [starsSelected, setStarsSelected] = useState(rating);
    const [editedUrl, setEditedUrl] = useState(url);

    const handleStarsSelectedChange = (newRating) => setStarsSelected(newRating);

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
                setIsProcessing(true); // Indicar que se está procesando la operación
                const response = await fetch(`${API_ROOT}/api/reviews/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        movieId: movieId,
                        newContent: editedDescription,
                        newScore: starsSelected
                    })
                });

                if(response.status !== 200) {
                    Alert.alert('Oops', 'Error response from server.');
                    setIsProcessing(false); // Finaliza el proceso de carga en caso de error
                    return;
                }

                setIsProcessing(false); // Finaliza el proceso de carga
                setIsModalVisible(false);
                // Actualiza el estado de la revisión aquí si es necesario
            } catch (error) {
                setIsProcessing(false); // Finaliza el proceso de carga en caso de error
                Alert.alert('Oops', 'Something went wrong trying to edit your review.');
            }
        }
    };

    const handleDelete = async () => {
        try {
            setIsProcessing(true); // Indicar que se está procesando la operación
            const response = await fetch(`${API_ROOT}/api/reviews/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ movieId })
            });

            if(response.status !== 200) {
                Alert.alert('Oops', 'Error response from server deleting your review.');
                setIsProcessing(false); // Finaliza el proceso de carga en caso de error
                return;
            }

            setIsProcessing(false); // Finaliza el proceso de carga
            setIsModalVisible(false);
            // Actualiza el estado de la revisión aquí si es necesario
        } catch (error) {
            setIsProcessing(false); // Finaliza el proceso de carga en caso de error
            Alert.alert('Oops', 'Something went wrong trying to delete your review.');
        }
    }

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
                            <StarRating onRating={handleStarsSelectedChange} fontSize={15} emptyStarColor={'white'} starsSelected={starsSelected}/>
                        ) : (
                            <Text style={style.rating}>Rating: {rating}/5</Text>
                        )}
                        
                    </View>
            </View>
            <ModalPop 
                handleClose={handleClose} 
                visible={isModalVisible} 
                toggleModal={toggleModal} 
                body={'Are you sure you want to delete this review?'}
                handleSumit={handleDelete}
            />
            {isProcessing && (
                <View style={style.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            )}
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
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyReviewBox;
