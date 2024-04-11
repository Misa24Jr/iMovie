import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Text, Image, TextInput } from "react-native";
import StarRating from "./StartRating";

const ModalReview = ({ body, visible, handleClose, handleChangeText }) => {

    const [value, setValue] = useState(0);

    const handleRating = (newValue) => {
        setValue(newValue);
    }

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(1,1,1,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        height: '35%',
                        width: '90%',
                        backgroundColor: '#D9D9D9',
                        borderRadius: 20,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            height: 45,
                            width: '100%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                        }}
                    >
                    </View>

                    <View
                        style={{
                            height: '80%',
                            paddingHorizontal: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 20,
                            width: '100%',
                        }}>
                        <TextInput
                        onChangeText={handleChangeText}
                            style={style.review}
                            placeholder="What you think about this..."
                            placeholderTextColor={'#524e3c'}
                            multiline
                            textAlignVertical="top"
                        />
                        <View style={style.contentRatingCheck}>
                            <StarRating fontSize={40}/>   
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#3C5252',
                                padding: 10,
                                borderRadius: 20,
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: 30,
                                padding: 10,
                            }}
                            onPress={handleClose}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'Jura_400Regular',
                                }}
                            >
                                Publish Review
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    body: {
        fontSize: 20,
        color: '#3C5252',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Jura_400Regular',
        padding: 10,
    },
    ratingCheck:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    contentRatingCheck:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    }, 
    review:{
        width: 350,
        height: 150,
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        fontFamily: 'Jura_400Regular',
        fontSize: 20,
        color: '#524e3c',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#9aabab',
        padding: 10
    }
    // Estilos adicionales aquí si es necesario
});

export default ModalReview;
