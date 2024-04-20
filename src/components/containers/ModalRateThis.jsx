import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Text, TextInput } from "react-native";
import StarRating from "./StartRating";

const ModalRateThis = ({ visible, handleClose, handleChangeText, handleStarsSelectedChange, handlePressOut }) => {
    const [value, setValue] = useState(0);

    const handleRating = (newValue) => {
        setValue(newValue);
        handleStarsSelectedChange(newValue);
    }

    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPressOut={handlePressOut}
            >
                <View
                    style={styles.modalContainer}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={styles.header}></View>
                    <View style={styles.content}>
                        <TextInput
                            onChangeText={handleChangeText}
                            style={styles.review}
                            placeholder="What you think about this..."
                            placeholderTextColor={'#524e3c'}
                            multiline
                            textAlignVertical="top"
                        />
                        <View style={styles.contentRatingCheck}>
                            <StarRating 
                                fontSize={40} 
                                onRating={handleRating} 
                                rating={value} 
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.publishButton}
                            onPress={handleClose}
                        >
                            <Text style={styles.publishButtonText}>
                                Publish Review
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        height: '35%',
        width: '90%',
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        alignItems: 'center',
    },
    header: {
        height: 45,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    content: {
        height: '80%',
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '100%',
    },
    review: {
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
    },
    contentRatingCheck: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    publishButton: {
        backgroundColor: '#3C5252',
        padding: 10,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    publishButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Jura_400Regular',
    },
});

export default ModalRateThis;
