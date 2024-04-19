// import React, { useState, useEffect } from 'react';
// import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { API_ROOT } from "@env";

// // Components
// import AccordionSearch from '../components/others/AccordionSearch';
// import AccordionGenre from '../components/others/AccordionGenre';
// import TabsSearch from '../components/button/TabsSearch';
// import BoxMovie from '../components/containers/BoxMovie';
// import Loading from '../components/others/Loading';

// const SearchView = () => {
//     const navigation = useNavigation();
//     const [searchResults, setSearchResults] = useState({});
//     const [activeTab, setActiveTab] = useState('All');
//     const [searchInputValue, setSearchInputValue] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [genresSelected, setGenresSelected] = useState([]);
//     const [isGenresSelected, setIsGenresSelected] = useState(genresSelected.length > 0);

//     const handleSearchInputValueChange = (text) => setSearchInputValue(text);

//     const handleSearchSubmit = async () => {
//         if (!searchInputValue.trim()) {
//             return; // Avoid searching with empty input
//         }
//         setLoading(true); // Start loading
//     };

//     const handleGenreSelection = (genre) => {
//         if (genresSelected.includes(genre)) {
//             setGenresSelected(genresSelected.filter(selected => selected !== genre));
//         } else {
//             setGenresSelected([...genresSelected, genre]);
//         }
//     };

//     const handleTextSearchSubmit = async () => {
//         try {
//             const response = await fetch(`${API_ROOT}/api/movies/searchByName`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ movieName: searchInputValue }),
//             });

//             if (response.status !== 200) {
//                 Alert.alert('Error', `Server error trying to get results for ${searchInputValue}`);
//                 setLoading(false);
//                 return;
//             }

//             const data = await response.json();
//             setSearchResults(data.searchResult);
//         } catch (error) {
//             Alert.alert('Error', `Something went wrong trying to get results for ${searchInputValue}`);
//         }
//     }

//     const handleGenreSearchSubmit = () => {
//         console.log("Genres selected:", genresSelected);
//     }

//     useEffect(() => {
//         return () => {
//             setSearchResults({});
//             setGenresSelected([]);
//         };
//     });

//     return (
//         <ScrollView style={style.container} contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 50, paddingBottom: 20 }}>
//             <TouchableOpacity onPress={() => navigation.navigate('NewsView')} style={{ marginBottom: 20 }}>
//                 <Ionicons name="arrow-back" size={24} color={'#FFFFFF'} />
//             </TouchableOpacity>

//             <View style={style.containerSearch}>
//                 <AccordionSearch onSearchChange={handleSearchInputValueChange} onSearchSubmit={handleTextSearchSubmit} title={'Search'}/>
//                 <AccordionGenre title={'Filters'} isGenreSelected={isGenresSelected} onSearchSubmit={handleGenreSearchSubmit} onGenresSelection={handleGenreSelection}/>
//                 {Object.keys(searchResults).length > 0 && (<TabsSearch setActiveTab={setActiveTab}/>)}

//                 {loading ? (
//                     <View style={style.loading}>
//                         <Loading/>
//                     </View>
//                 ) : (
//                     <View>
//                         {activeTab === 'All' && searchResults.movies && searchResults.movies.map((movie, index) => (
//                             <BoxMovie
//                                 key={index}
//                                 poster={movie.poster_path}
//                                 title={movie.title}
//                                 year={movie.release_date}
//                                 actors={movie.actors[0]}
//                                 rating={movie.audience_score}
//                             />
//                         ))}
//                         {searchResults.tvs && searchResults.tvs.length > 0 && searchResults.tvs.map((tv, index) => (
//                             <BoxMovie 
//                                 key={index} 
//                                 poster={tv.poster_path}
//                                 title={tv.title} 
//                                 year={tv.release_date}
//                                 actors={tv.actors[0]} 
//                                 rating={tv.audience_score}
//                             />
//                             ))}


//                         {activeTab === 'Movies' && searchResults.movies && searchResults.movies.map((movie, index) => (
//                             <BoxMovie
//                                 key={index}
//                                 poster={movie.poster_path}
//                                 title={movie.title}
//                                 year={movie.release_date}
//                                 actors={movie.actors[0]}
//                                 rating={movie.audience_score}
//                             />
//                         ))}
//                         {activeTab === 'Tv Shows' && searchResults.tvs && searchResults.tvs.map((tv, index) => (
//                             <BoxMovie
//                                 key={index}
//                                 poster={tv.poster_path}
//                                 title={tv.title}
//                                 year={tv.release_date}
//                                 actors={tv.actors[0]}
//                                 rating={tv.audience_score}
//                             />
//                         ))}
//                         {activeTab === 'Most Recent' && searchResults.movies && searchResults.movies.map((movie, index) => (
//                             <BoxMovie
//                                 key={index}
//                                 poster={movie.poster_path}
//                                 title={movie.title}
//                                 year={movie.release_date}
//                                 actors={movie.actors[0]}
//                                 rating={movie.audience_score}
//                             />
//                         ))}
//                         {activeTab === 'Most Rated' && searchResults.movies && searchResults.movies.map((movie, index) => (
//                             <BoxMovie
//                                 key={index}
//                                 poster={movie.poster_path}
//                                 title={movie.title}
//                                 year={movie.release_date}
//                                 actors={movie.actors[0]}
//                                 rating={movie.audience_score}
//                             />
//                         ))}
                        
//                     </View>
//                 )}
//             </View>
//         </ScrollView>
//     );
// }; 

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#151515',
//     },
//     containerSearch:{
//         // Styles for your search container
//     },
//     textSearch:{
//         color: '#fff',
//         fontSize: 16,
//         fontFamily: 'Jura_400Regular',
//     },
//     textOption:{
//         color: '#fff',
//         fontSize: 16,
//         fontFamily: 'Jura_400Regular',
//         marginTop: 20,
//     },
//     loading:{
//         marginTop: 40,
//     }
// });

// export default SearchView;

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_ROOT } from "@env";

// Components
import AccordionSearch from '../components/others/AccordionSearch';
import AccordionGenre from '../components/others/AccordionGenre';
import TabsSearch from '../components/button/TabsSearch';
import BoxMovie from '../components/containers/BoxMovie';

const SearchView = () => {
    const navigation = useNavigation();
    const [searchResults, setSearchResults] = useState({});
    const [activeTab, setActiveTab] = useState('All');
    const [searchInputValue, setSearchInputValue] = useState('');
    const [genresSelected, setGenresSelected] = useState([]);
    const [isGenresSelected, setIsGenresSelected] = useState(genresSelected.length > 0);

    const handleSeachInputValueChange = (text) => setSearchInputValue(text);

    const handleGenreSelection = (genre) => {
        if (genresSelected.includes(genre)) {
            setGenresSelected(genresSelected.filter(selected => selected !== genre));
        } else {
            setGenresSelected([...genresSelected, genre]);
        }
    };
    
    useEffect(() => {
        setIsGenresSelected(genresSelected.length > 0);
    }, [genresSelected]);

    const handleTextSearchSubmit = async () => {
        try {
            const response = await fetch(`${API_ROOT}/api/movies/searchByName`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieName: searchInputValue }),
            });

            if(response.status !== 200) return Alert.alert('Error', `Server error trying to get results for ${searchInputValue}`);

            const data = await response.json();

            setSearchResults({});
            return setSearchResults(data.searchResult);
        } catch (error) {
            return Alert.alert('Error', `Something went wrong trying to get results for ${searchInputValue}`);
        }
    }

    const handleGenreSearchSubmit = async () => {
        try {
            const response = await fetch(`${API_ROOT}/api/movies/searchByGenre`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ genres: genresSelected }),
            });

            if(response.status !== 200) return Alert.alert('Error', `Server error trying to get results`);

            const data = await response.json();

            setSearchResults({});
            return setSearchResults(data.searchResult);
        } catch (error) {
            return Alert.alert('Error', `Something went wrong trying to get results for ${searchInputValue}`);
        }
    }

    useEffect(() => {
        return () => {
            setSearchResults({});
            setGenresSelected([]);
        };
    }, []);

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
                    <Ionicons name="arrow-back" size={24} color={'#FFFFFF'} />
                </TouchableOpacity>

                <View style={style.containerSearch}>
                    <AccordionSearch onSearchChange={handleSeachInputValueChange} onSearchSubmit={handleTextSearchSubmit} title={'Search'}/>
                    <AccordionGenre title={'Filters'} isGenreSelected={isGenresSelected} onSearchSubmit={handleGenreSearchSubmit} onGenresSelection={handleGenreSelection}/>
                    {Object.keys(searchResults).length > 0 && (<TabsSearch setActiveTab={setActiveTab}/>)}
                    
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
    textOption:{
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Jura_400Regular',
        marginTop: 20,
    },
    containerOption:{

    }
});

export default SearchView;