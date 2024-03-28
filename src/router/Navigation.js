import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Views
import Welcome from '../views/Welcome';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import NewsView from '../views/NewsView';

// Components
import HomeTemplaneComponent from '../components/containers/HomeTemplaneComponent'



const Stack = createNativeStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator
            initialRouteName='Welcome'
        >
            <Stack.Screen 
                name="Welcome" 
                component={Welcome} 
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                name="LoginView" 
                component={LoginView} 
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                name="RegisterView" 
                component={RegisterView} 
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="NewsView"
                component={NewsView}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="HomeTemplaneComponent"
                component={HomeTemplaneComponent}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}