import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Components
import Genre from "../containers/Genre";

// Habilitar LayoutAnimation en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionGenre = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleAccordion} style={styles.header}>

                        <View style={styles.containerGroup}>
                            <Text style={styles.title}>{title}</Text>

                            <TouchableOpacity style={styles.searchButton} onPress={() => console.log('seacrh')}>
                                <Ionicons name="search" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                
                    <View style={[styles.circle, { backgroundColor: expanded ? "#8CCECC" : "gray" }]} />
                </TouchableOpacity>
                {expanded && (
                    <View style={styles.contentContainer}>
                            <Genre name={'Action'} />
                            <Genre name={'Adventure'} />
                            <Genre name={'Animation'} />
                            <Genre name={'Comedy'} />
                            <Genre name={'Crime'} />
                            <Genre name={'Drama'} />
                            <Genre name={'Family'} />
                            <Genre name={'Fantasy'} />  
                            <Genre name={'History'} />
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
