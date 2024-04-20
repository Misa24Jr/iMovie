import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Views
import Welcome from '../views/Welcome';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import NewsView from '../views/NewsView';
import MyReviewView from '../views/MyReviewView';
import UserSettings from '../views/UserSettings';
import MovieView from '../views/MovieView';
import SearchView from '../views/SearchView';
import GeneralChat from '../views/GeneralChat';

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

            <Stack.Screen
                name="MyReviewView"
                component={MyReviewView}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="UserSettings"
                component={UserSettings}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="MovieView"
                component={MovieView}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SearchView"
                component={SearchView}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="GeneralChat"
                component={GeneralChat}
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