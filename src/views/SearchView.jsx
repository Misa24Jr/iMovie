import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Components
import AccordionSearch from '../components/others/AccordionSearch';
import AccordionGenre from '../components/others/AccordionGenre';
import TabsSearch from '../components/button/TabsSearch';
import BoxMovie from '../components/containers/BoxMovie';

const SearchView = () => {
    const navigation = useNavigation();
    const [searchResults, setSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState('All');


    const fetchAll = () =>{
        console.log('fetchAll')
    };

    const fetchMovies = () =>{
        console.log('fetchMovies')
    };

    const fetchTvShows = () =>{
        console.log('fetchTvShows')
    };

    const fetchMostRecent = () =>{
        console.log('fetchMostRecent')
    };

    const fetchMostRated = () =>{
        console.log('fetchMostRated')
    };
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
                    <AccordionSearch title={'Search'}/>
                    <AccordionGenre title={'Filters'}/>
                    <TabsSearch setActiveTab={setActiveTab}/>
                    {activeTab === 'All' && (
                        <>
                            {/* <View style={style.containerOption}>
                                <Text style={style.textOption}>All content</Text>
                                <BoxMovie title={'The Shawshank Redemption'} year={1994} actors={'Frank Darabont'} rating={'91%'}/>
                                <BoxMovie title={'Avengers: ENDGAME'} year={2012} actors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                            </View> */}
                            {fetchAll()}
                        </>
                    )}
                    {activeTab === 'Movies' && (
                        <>
                            {/* <View style={style.containerOption}>
                                <Text style={style.textOption}>Movie content</Text>
                                <BoxMovie title={'The Shawshank Redemption'} year={1994} actors={'Frank Darabont'} rating={'91%'}/>
                                <BoxMovie title={'Avengers: ENDGAME'} year={2012} actors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                            </View> */}
                            {fetchMovies()}
                        </>
                    )}
                    {activeTab === 'Tv Shows' && (
                        <>
                            {/* <View style={style.containerOption}>
                                <Text style={style.textOption}>TV show content</Text>
                                <BoxMovie title={'Breaking Bad'} year={2008} actors={'Vince Gilligan'} rating={'96%'}/>
                                <BoxMovie title={'Game of Thrones'} year={2011} actors={'David Benioff - D. B. Weiss'} rating={'89%'}/>
                            </View> */}
                            {fetchTvShows()}
                        </>
                    )}

                    {activeTab === 'Most Recent' && (
                        <>
                            {/* <View style={style.containerOption}>
                                <Text style={style.textOption}>Most recent content</Text>
                                <BoxMovie title={'Avengers: ENDGAME'} year={2012} actors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                                <BoxMovie title={'The Lord of the Rings: The Fellowship of the Ring'} year={2001} actors={''} rating={'91%'}/>
                            </View> */}
                            {fetchMostRecent()}
                        </>
                    )}

                    {activeTab === 'Most Rated' && (
                        <>
                            {/* <View style={style.containerOption}>
                                <Text style={style.textOption}>Most rated content</Text>
                                <BoxMovie title={'The Godfather'} year={1972} actors={'Francis Ford Coppola'} rating={'98%'}/>
                                <BoxMovie title={'The Shawshank Redemption'} year={1994} actors={'Frank Darabont'} rating={'91%'}/>
                            </View> */}
                            {fetchMostRated()}
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
