import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Text, Image, TextInput } from "react-native";
import { RadioButton } from 'react-native-paper';

const ModalReview = ({ body, visible, handleClose }) => {
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
                        width: '100%',
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
                            style={style.review}
                            placeholder="Escribe tu reseña aquí..."
                        />
                        <View style={style.contentRatingCheck}>
                            <RadioButton.Group onValueChange={handleRating} value={value}>
                                <View style={style.ratingCheck}>
                                    <RadioButton.Item
                                        value="1"
                                        uncheckedColor="transparent"
                                        color="#3C5252"
                                        status={value === "1" ? 'checked' : 'unchecked'}
                                        style={{height: 50, justifyContent: 'center', alignItems: 'center'}}
                                    />
                                    <RadioButton.Item
                                        
                                        value="2"
                                        uncheckedColor="transparent"
                                        color="#3C5252"
                                        status={value === "2" ? 'checked' : 'unchecked'}
                                        style={{height: 50, justifyContent: 'center', alignItems: 'center'}}

                                    />
                                    <RadioButton.Item
                                        
                                        value="3"
                                        uncheckedColor="transparent"
                                        color="#3C5252"
                                        status={value === "3" ? 'checked' : 'unchecked'}
                                        style={{height: 50, justifyContent: 'center', alignItems: 'center'}}

                                    />
                                    <RadioButton.Item
                                        
                                        value="4"
                                        uncheckedColor="transparent"
                                        color="#3C5252"
                                        status={value === "4" ? 'checked' : 'unchecked'}
                                        style={{height: 50, justifyContent: 'center', alignItems: 'center'}}

                                    />
                                    <RadioButton.Item
                                        
                                        value="5"
                                        uncheckedColor="transparent"
                                        color="#3C5252"
                                        status={value === "5" ? 'checked' : 'unchecked'}
                                        style={{height: 50, justifyContent: 'center', alignItems: 'center'}}
                                    />
                                </View>
                            </RadioButton.Group>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#3C5252',
                                padding: 10,
                                borderRadius: 20,
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'Jura_400Regular',
                                }}
                            >
                                Enviar
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
        backgroundColor: 'blue',
    },
    contentRatingCheck:{
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    review:{
        width: '100%',
        height: 150,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        textAlign: 'center',
        fontFamily: 'Jura_400Regular',
        fontSize: 20,
        color: '#3C5252',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#3C5252',
        backgroundColor: 'red',
    }
    // Estilos adicionales aquí si es necesario
});

export default ModalReview;
