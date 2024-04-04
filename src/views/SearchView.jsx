import React, {useState} from "react";
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';


// Components
import AccordionSearch from "../components/others/AccordionSearch";
import AccordionGenre from "../components/others/AccordionGenre";
import TabsSearch from "../components/button/TabsSearch";
import BoxMovie from "../components/containers/BoxMovie";

const SearchView = () => {
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
                    <AccordionSearch title={'Search'}/>
                    <AccordionGenre title={'Filters'}/>
                    <TabsSearch/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                    <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
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