import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Habilitar LayoutAnimation en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionSearch = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
    const [searchText, setSearchText] = useState("");

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const handleSearch = () => {
        // Realizar la búsqueda aquí
        console.log("Buscando:", searchText);
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={[styles.circle, { backgroundColor: expanded ? "#8CCECC" : "gray" }]} />
                </TouchableOpacity>
                {expanded && (
                    <View style={styles.contentContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder=" ej. titanic"
                                value={searchText}
                                onChangeText={text => setSearchText(text)}
                                placeholderTextColor={'#444747'}
                            />
                            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                                <Ionicons name="search" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
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
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#8A909033',
        borderWidth: 1,
        borderRadius: 25,
        overflow: 'hidden',
        borderColor: '#3C5252',
        borderWidth: 2,
        
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#FFFFFF',
        fontFamily: 'Jura_400Regular',
    },
    searchButton: {
        backgroundColor: 'gray',
        padding: 10,
    },
});

export default AccordionSearch;
