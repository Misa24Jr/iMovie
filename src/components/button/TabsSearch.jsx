import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabsSearch = ({ setActiveTab }) => {
    const [activeButton, setActiveButton] = useState('All');

    return(
        <View style={style.container}>
            <TouchableOpacity onPress={() => { setActiveTab('All'); setActiveButton('All'); }}>
                <Text style={[style.text, activeButton === 'All' && style.activeText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setActiveTab('Movies'); setActiveButton('Movies'); }}>
                <Text style={[style.text, activeButton === 'Movies' && style.activeText]}>Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setActiveTab('Tv Shows'); setActiveButton('Tv Shows'); }}>
                <Text style={[style.text, activeButton === 'Tv Shows' && style.activeText]}>Tv Shows</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setActiveTab('Most Recent'); setActiveButton('Most Recent'); }}>
                <Text style={[style.text, activeButton === 'Most Recent' && style.activeText]}>Most Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setActiveTab('Most Rated'); setActiveButton('Most Rated'); }}>
                <Text style={[style.text, activeButton === 'Most Rated' && style.activeText]}>Most Rated</Text>
            </TouchableOpacity>
            {/* Agrega más botones según sea necesario */}
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
        padding: 5,
    },
    text:{
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Jura_400Regular',
        padding: 5,
        fontWeight: 'bold',
    },
    activeText: {
        color: '#3C5252', // Color de fondo activo
    }
});

export default TabsSearch;
