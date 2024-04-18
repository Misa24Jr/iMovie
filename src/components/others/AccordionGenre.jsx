import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Components
import Genre from "../containers/Genre";

// Habilitar LayoutAnimation en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionGenre = ({ title }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const handleGenreSelection = (genreName) => {
        if (selectedGenres && selectedGenres.includes(genreName)) {
            setSelectedGenres(selectedGenres.filter(genre => genre !== genreName));
        } else {
            setSelectedGenres([...selectedGenres, genreName]);
        }
    };

    const handleSearch = () => {
        console.log("Selected genres:", selectedGenres);
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleAccordion} style={styles.header}>

                        <View style={styles.containerGroup}>
                            <Text style={styles.title}>{title}</Text>

                            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                                <Ionicons name="search" size={24} color="#555959" />
                            </TouchableOpacity>
                        </View>
                
                    <View style={[styles.circle, { backgroundColor: expanded ? "#8CCECC" : "gray" }]} />
                </TouchableOpacity>
                {expanded && (
                    <View style={styles.contentContainer}>
                            <Genre name={'Action'} onPress={handleGenreSelection}/>
                            <Genre name={'Animation'} onPress={handleGenreSelection}/>
                            <Genre name={'Comedy'} onPress={handleGenreSelection}/>
                            <Genre name={'Crime'} onPress={handleGenreSelection}/>
                            <Genre name={'Drama'} onPress={handleGenreSelection}/>
                            <Genre name={'Family'} onPress={handleGenreSelection}/>
                            <Genre name={'Fantasy'} onPress={handleGenreSelection}/>  
                            <Genre name={'History'} onPress={handleGenreSelection}/>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#151515',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Jura_400Regular',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    contentContainer: {
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: '',
        alignItems: 'flex-start',
        gap: 10,
    },
    containerGroup:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
    }
});

export default AccordionGenre;
