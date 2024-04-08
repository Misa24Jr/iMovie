import React, {useState} from "react";
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';


// Components
import AccordionSearch from "../components/others/AccordionSearch";
import AccordionGenre from "../components/others/AccordionGenre";
import TabsSearch from "../components/button/TabsSearch";
import BoxMovie from "../components/containers/BoxMovie";

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
                    <Image
                        style={{width: 30, height: 30}}
                        source={require('../../assets/back.png')}
                    />
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