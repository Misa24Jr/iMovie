import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TMDB_API_ROOT } from "@env";

// Components
import Genre from "../containers/Genre";

// Habilitar LayoutAnimation en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionGenre = ({ title, onGenresSelection, onSearchSubmit, isGenreSelected }) => {
    const [expanded, setExpanded] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const getGenres = async () => {
        try {
            const response = await fetch(`${TMDB_API_ROOT}/genre/movie/list?language=en`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjEzODkzMTU1YzJmZjY4OGJkODMyZTRkMWJiZTlhMCIsInN1YiI6IjY2MDJmMjM4Yjg0Y2RkMDE0YWY1NTFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pSTbcbWcScjdicQLg6ssg1HTCr_2CKNW9qhQnynwjME'
                  }
            });

            if(response.status !== 200) return Alert.alert('Error', 'Server error trying to get genres');

            const data = await response.json();
            return setGenres(data.genres);
        } catch (error) {
            return Alert.alert('Error', 'Something went wrong trying to get genres');
        }
    }

    useEffect(() => {
        getGenres();
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
                        <View style={styles.containerGroup}>
                            <Text style={styles.title}>{title}</Text>

                            <TouchableOpacity style={styles.searchButton} onPress={onSearchSubmit} disabled={!isGenreSelected} >
                                <Ionicons name="search" size={24} color={isGenreSelected ? "#FFFFFF" : "#555959"} />
                            </TouchableOpacity>
                        </View>
                    <View style={[styles.circle, { backgroundColor: expanded ? "#8CCECC" : "gray" }]} />
                </TouchableOpacity>
                {expanded && (
                    <View style={styles.contentContainer}>
                            {genres && genres.length > 0 && genres.map((genre, index) => (
                                <Genre
                                    key={index}
                                    id={genre.id}
                                    name={genre.name}
                                    onPress={onGenresSelection}
                                />
                            ))}
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
