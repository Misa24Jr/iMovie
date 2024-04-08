import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// Components
import ModalPop from "./ModalPop";

const MyReviewBox = ({url, description, rating}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };


    return(
        <>
            <View style={style.containerBox}>
                <View style={style.containerImage}>
                    <View style={style.containerButton}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                source={require('../../../assets/pencil.png')}
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
                        source={{uri: 'https://images.pexels.com/photos/1662298/pexels-photo-1662298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
                    />
                </View>

                <View style={style.containerdescription}>
                    <Text style={style.description}>{description}</Text>
                    <View style={style.containerRating}>
                        <Text style={style.rating}>Rating: {rating}/5</Text>
                    </View>
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
