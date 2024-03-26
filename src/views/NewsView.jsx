import React, {useRef} from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    Dimensions, 
    Animated
} from "react-native";
// Components 
import TitlePage from "../components/others/TitlePage";


const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;


const img = [
    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
    "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
    "https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
  ];

const NewsView = () => {

    const scrollX = useRef(new Animated.Value(0)).current;

    return(
        <View style={style.container}>
            <TitlePage />
            <Animated.FlatList
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true}
            )}
                data={img}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingTop:200, paddingHorizontal: ESPACIO_LATERAL}}
                decelerationRate={0}
                snapToInterval={ANCHO_CONTENEDOR}
                scrollEventThrottle={16}
                keyExtractor={(item) => item}
                renderItem={({item, index}) =>{
                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,
                        index * ANCHO_CONTENEDOR,
                        (index + 1) * ANCHO_CONTENEDOR,
                    ];

                    const outputRange = [0, -50, 0];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange,
                    })


                    return(
                        <View style={style.containerImage}>
                            <Animated.View
                                style={{
                                    marginHorizontal: ESPACIO,
                                    padding: ESPACIO,
                                    borderRadius: 34,
                                    alignItems: 'center',
                                    transform: [{translateY}],
                                    display: 'flex',
                                    gap: 10,
                                }}
                            >
                                <Text style={style.title}>Titulo</Text>
                                <Image source={{uri: item}} style={style.posterImage}/>
                                <View style={style.containerPOP}>
                                    <Image
                                        source={require('../../assets/pop.png')}
                                        style={{width: 40, height: 40}}
                                    />
                                    <Text style={style.points}>50%</Text>
                                </View>
                            </Animated.View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerImage:{
        width: ANCHO_CONTENEDOR,
    },
    posterImage:{
        width: '100%',
        height: ANCHO_CONTENEDOR * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    containerPOP:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    points:{
        color: 'white',
        fontSize: 35,
        fontFamily: 'Jura_400Regular'
    }, 
    title:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'Jura_400Regular'
    }
});

export default NewsView;
