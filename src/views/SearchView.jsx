import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_ROOT } from "@env";
import AccordionSearch from '../components/others/AccordionSearch';
import AccordionGenre from '../components/others/AccordionGenre';
import TabsSearch from '../components/button/TabsSearch';
import BoxMovie from '../components/containers/BoxMovie';
import Loading from '../components/others/Loading';

const SearchView = () => {
    const navigation = useNavigation();
    const [searchResults, setSearchResults] = useState({});
    const [activeTab, setActiveTab] = useState('All');
    const [searchInputValue, setSearchInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [genresSelected, setGenresSelected] = useState([]);
    const [isGenresSelected, setIsGenresSelected] = useState(genresSelected.length > 0);

    const handleSearchInputValueChange = (text) => setSearchInputValue(text);

    const handleTextSearchSubmit = async () => {
        if (!searchInputValue.trim()) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_ROOT}/api/movies/searchByName`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieName: searchInputValue }),
            });

            if (response.status !== 200) {
                Alert.alert('Error', `Server error trying to get results for ${searchInputValue}`);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setSearchResults({});
            setSearchResults(data.searchResult);
        } catch (error) {
            Alert.alert('Error', `Something went wrong trying to get results for ${searchInputValue}`);
        }
        setLoading(false); 
    };

    const handleGenreSelection = (genre) => {
        if (genresSelected.includes(genre)) {
            setGenresSelected(genresSelected.filter(selected => selected !== genre));
        } else {
            setGenresSelected([...genresSelected, genre]);
        }
    };

    const handleGenreSearchSubmit = async () => {
        console.log("Genres selected:", genresSelected);
        try {
            setLoading(true);
            const response = await fetch(`${API_ROOT}/api/movies/searchByGenre`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ genres: genresSelected }),
            });

            if (response.status !== 200) {
                setLoading(false);
                return Alert.alert('Error', 'Server error trying to get results for selected genres');
            }

            const data = await response.json();

            setSearchResults({});
            setSearchResults(data.searchResult);
            return setLoading(false);
        } catch (error) {
            setLoading(false);
            return Alert.alert('Error', 'Something went wrong trying to get results for selected genres');
        }
    }

    useEffect(() => {
        return () => {
            setSearchResults({});
            setGenresSelected([]);
        };
    }, []);

    useEffect(() => {
        setIsGenresSelected(genresSelected.length > 0);
    }, [genresSelected]);

    return (
        <ScrollView style={style.container} contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 50, paddingBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('NewsView')} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={24} color={'#FFFFFF'} />
            </TouchableOpacity>

            <View style={style.containerSearch}>
                <AccordionSearch onSearchChange={handleSearchInputValueChange} onSearchSubmit={handleTextSearchSubmit} title={'Search'}/>
                <AccordionGenre title={'Filters'} isGenreSelected={isGenresSelected} onSearchSubmit={handleGenreSearchSubmit} onGenresSelection={handleGenreSelection}/>
                {Object.keys(searchResults).length > 0 && (<TabsSearch setActiveTab={setActiveTab}/>)}

                {loading ? (
                    <View style={style.loading}>
                        <Loading/>
                    </View>
                ) : (
                    <View>
                        {activeTab === 'All' && (
                            <>
                                <View style={style.containerOption}>
                                    <Text style={style.textOption}>All content</Text>
                                    {searchResults.movies && searchResults.movies.length > 0 && searchResults.movies.map((movie, index) => (
                                        <BoxMovie
                                            poster={movie.poster_path}
                                            key={index} 
                                            title={movie.title} 
                                            year={movie.release_date}
                                            actors={movie.actors[0]} 
                                            rating={movie.audience_score}
                                        />
                                    ))}
                                    {searchResults.tvs && searchResults.tvs.length > 0 && searchResults.tvs.map((tv, index) => (
                                        <BoxMovie 
                                            key={index} 
                                            poster={tv.poster_path}
                                            title={tv.title} 
                                            year={tv.release_date}
                                            actors={tv.actors[0]} 
                                            rating={tv.audience_score}
                                        />
                                    ))}
                                </View>
                            </>
                        )}

                        {activeTab === 'Movies' && (
                            <>
                                <View style={style.containerOption}>
                                    <Text style={style.textOption}>Movies</Text>
                                    {searchResults.movies.length > 0 && searchResults.movies
                                        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                                        .map((movie, index) => (
                                            <BoxMovie
                                                poster={movie.poster_path}
                                                key={index} 
                                                title={movie.title} 
                                                year={movie.release_date}
                                                actors={movie.actors[0]} 
                                                rating={movie.audience_score}
                                            />
                                        ))}
                                </View>
                            </>
                        )}

                        {activeTab === 'Tv Shows' && (
                            <>
                                <View style={style.containerOption}>
                                    <Text style={style.textOption}>Tv Shows</Text>
                                    {searchResults.tvs.length > 0 && searchResults.tvs.map((tv, index) => (
                                        <BoxMovie 
                                            key={index} 
                                            poster={tv.poster_path}
                                            title={tv.title} 
                                            year={tv.release_date}
                                            actors={tv.actors[0]} 
                                            rating={tv.audience_score}
                                        />
                                    ))}
                                </View>
                            </>
                        )}

                        {activeTab === 'Most Recent' && (
                            <>
                                <View>
                                    <Text style={style.textOption}>Most recent content</Text>
                                    {searchResults.movies.length > 0 && searchResults.movies
                                        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
                                        .map((movie, index) => (
                                            <BoxMovie
                                                poster={movie.poster_path}
                                                key={index} 
                                                title={movie.title} 
                                                year={movie.release_date}
                                                actors={movie.actors[0]} 
                                                rating={movie.audience_score}
                                            />
                                        ))}
                                </View>
                            </>
                        )}

                        {activeTab === 'Most Rated' && (
                            <>
                                <View>
                                    <Text style={style.textOption}>Most rated content</Text>
                                    {searchResults.movies.length > 0 && searchResults.movies
                                        .sort((a, b) => b.audience_score - a.audience_score)
                                        .map((movie, index) => (
                                            <BoxMovie
                                                poster={movie.poster_path}
                                                key={index} 
                                                title={movie.title} 
                                                year={movie.release_date}
                                                actors={movie.actors[0]} 
                                                rating={movie.audience_score}
                                            />
                                        ))}
                                </View>
                            </>
                        )}

                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#151515',
    },
    textSearch: {
        color: '#FFFFFF',
        fontFamily: 'Jura_400Regular',
        marginTop: 40,
    },
    loading:{
        marginTop: 40
    }
});

export default SearchView;
