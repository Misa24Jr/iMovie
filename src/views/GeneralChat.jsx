import React from "react";
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Components

const GeneralChat = () => {
    const navigation = useNavigation();

    return(
        <>
            <ScrollView 
                style={style.container}
                contentContainerStyle={{paddingHorizontal: 30, paddingTop: 50, paddingBottom: 20}}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewsView')}
                    style={{marginBottom: 20}}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={style.containerSearch}>

                </View>


            </ScrollView>
        </>
    )
}; 

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
});

export default GeneralChat;