import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabsSearch = ({ tabs, activeTab, setActiveTab }) => {
    return(
        <View style={style.container}>
            <TouchableOpacity>
                <Text style={style.textt}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={style.text}>Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={style.text}>Tv Shows</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={style.text}>Most Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={style.text}>Most Rated</Text>
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    container:{
        backgroundColor: '#6F9292',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 370,
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
    },
    text:{
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Jura_400Regular',
        padding: 5,
    },
    textt:{
        color: '#3C5252',
        fontSize: 16,
        fontFamily: 'Jura_400Regular',
        padding: 5,
        fontWeight: "900",
    },
});

export default TabsSearch;