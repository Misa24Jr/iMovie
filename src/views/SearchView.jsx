import React, {useState} from "react";
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';

// Components
import AccordionSearch from "../components/others/AccordionSearch";

const SearchView = () => {
    const navigation = useNavigation();

    return(
        <>
            <ScrollView 
                style={style.container}
                contentContainerStyle={{paddingHorizontal: 30, paddingTop: 50}}
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
                    <AccordionSearch title={'Search'}/>
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
    containerSearch:{
        // flexDirection: 'row',
        // alignItems: 'center',
        // padding: 10,
        // gap: 10,
    },
    textSearch:{
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Jura_400Regular',
    },
});

export default SearchView;