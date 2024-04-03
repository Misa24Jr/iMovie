import React from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Text } from "react-native";

const ModalPop = ({body, handleClick}) =>{
    <Modal
        animationType="slide"
        transparent
        visible={true}
    >
        <View
            style={{
                flex: 1,
                backgroundColor: 'rgba(1,1,1,0.5)'
            }}
        >
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, ex maxime. Saepe sit eveniet nobis est delectus nesciunt quasi, odit aliquam eos? Consequatur dolore vitae inventore, sit magnam non sapiente?</Text>
        </View>
    </Modal>
}

export default ModalPop;