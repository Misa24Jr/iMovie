import React, { useState } from 'react';
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

    const handleSearchInputValueChange = (text) => setSearchInputValue(text);

    const handleSearchSubmit = async () => {
        if (!searchInputValue.trim()) {
            return; // Avoid searching with empty input
        }
        setLoading(true); // Start loading
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
            setSearchResults(data.searchResult);
        } catch (error) {
            Alert.alert('Error', `Something went wrong trying to get results for ${searchInputValue}`);
        }
        setLoading(false); // End loading
    };

    return (
        <ScrollView style={style.container} contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 50, paddingBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('NewsView')} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={24} color={'#FFFFFF'} />
            </TouchableOpacity>

            <View style={style.containerSearch}>
                <AccordionSearch onSearchChange={handleSearchInputValueChange} onSearchSubmit={handleSearchSubmit} title={'Search'}/>
                <AccordionGenre title={'Filters'}/>
                {Object.keys(searchResults).length > 0 && (<TabsSearch setActiveTab={setActiveTab}/>)}

                {loading ? (
                    <View style={style.loading}>
                        <Loading/>
                    </View>
                ) : (
                    <View>
                        {activeTab === 'All' && searchResults.movies && searchResults.movies.map((movie, index) => (
                            <BoxMovie
                                key={index}
                                poster={movie.poster_path}
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


                        {activeTab === 'Movies' && searchResults.movies && searchResults.movies.map((movie, index) => (
                            <BoxMovie
                                key={index}
                                poster={movie.poster_path}
                                title={movie.title}
                                year={movie.release_date}
                                actors={movie.actors[0]}
                                rating={movie.audience_score}
                            />
                        ))}
                        {activeTab === 'Tv Shows' && searchResults.tvs && searchResults.tvs.map((tv, index) => (
                            <BoxMovie
                                key={index}
                                poster={tv.poster_path}
                                title={tv.title}
                                year={tv.release_date}
                                actors={tv.actors[0]}
                                rating={tv.audience_score}
                            />
                        ))}
                        {activeTab === 'Most Recent' && searchResults.movies && searchResults.movies.map((movie, index) => (
                            <BoxMovie
                                key={index}
                                poster={movie.poster_path}
                                title={movie.title}
                                year={movie.release_date}
                                actors={movie.actors[0]}
                                rating={movie.audience_score}
                            />
                        ))}
                        {activeTab === 'Most Rated' && searchResults.movies && searchResults.movies.map((movie, index) => (
                            <BoxMovie
                                key={index}
                                poster={movie.poster_path}
                                title={movie.title}
                                year={movie.release_date}
                                actors={movie.actors[0]}
                                rating={movie.audience_score}
                            />
                        ))}

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
