import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import AccordionSearch from '../components/others/AccordionSearch';
import AccordionGenre from '../components/others/AccordionGenre';
import TabsSearch from '../components/button/TabsSearch';
import BoxMovie from '../components/containers/BoxMovie';

const SearchView = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('All');

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
                    <Image
                        style={{width: 30, height: 30}}
                        source={require('../../assets/back.png')}
                    />
                </TouchableOpacity>

                <View style={style.containerSearch}>
                    <AccordionSearch title={'Search'}/>
                    <AccordionGenre title={'Filters'}/>
                    <TabsSearch setActiveTab={setActiveTab}/>
                    {/* Renderizar los resultados según la pestaña activa */}
                    {activeTab === 'All' && (
                        <>
                            <View style={style.containerOption}>
                                <Text style={style.textOption}>All content</Text>
                                <BoxMovie title={'The Shawshank Redemption'} year={1994} autors={'Frank Darabont'} rating={'91%'}/>
                                <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                                <BoxMovie title={'Matrix'} year={1999} autors={'The Wachowskis'} rating={'87%'}/>
                                <BoxMovie title={'The Lord of the Rings: The Fellowship of the Ring'} year={2001} autors={''} rating={'91%'}/>
                                <BoxMovie title={'The Godfather'} year={1972} autors={'Francis Ford Coppola'} rating={'98%'}/>
                            </View>
                        </>
                    )}
                    {activeTab === 'Movies' && (
                        <>
                            <View style={style.containerOption}>
                                <Text style={style.textOption}>Movie content</Text>
                                <BoxMovie title={'The Shawshank Redemption'} year={1994} autors={'Frank Darabont'} rating={'91%'}/>
                                <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                            </View>
                        </>
                    )}
                    {activeTab === 'Tv Shows' && (
                        <>
                            <View style={style.containerOption}>
                                <Text style={style.textOption}>TV show content</Text>
                                <BoxMovie title={'Breaking Bad'} year={2008} autors={'Vince Gilligan'} rating={'96%'}/>
                                <BoxMovie title={'Game of Thrones'} year={2011} autors={'David Benioff - D. B. Weiss'} rating={'89%'}/>
                            </View>
                        </>
                    )}

                    {activeTab === 'Most Recent' && (
                        <>
                            <View style={style.containerOption}>
                                <Text style={style.textOption}>Most recent content</Text>
                                <BoxMovie title={'Avengers: ENDGAME'} year={2012} autors={'Misael Reverol - Isabella Fonseca'} rating={'64%'}/>
                                <BoxMovie title={'The Lord of the Rings: The Fellowship of the Ring'} year={2001} autors={''} rating={'91%'}/>
                            </View>
                        </>
                    )}

                    {activeTab === 'Most Rated' && (
                        <>
                            <View style={style.containerOption}>
                                <Text style={style.textOption}>Most rated content</Text>
                                <BoxMovie title={'The Godfather'} year={1972} autors={'Francis Ford Coppola'} rating={'98%'}/>
                                <BoxMovie title={'The Shawshank Redemption'} year={1994} autors={'Frank Darabont'} rating={'91%'}/>
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
