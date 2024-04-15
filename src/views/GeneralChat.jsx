import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_ROOT, CHAT_SERVER } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

const GeneralChat = () => {
    const navigation = useNavigation();
    const [socketClient, setSocketClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleMessageSend = async () => {
        if (inputMessage.trim() !== '') {
            console.log('connected??', socketClient.connected);

            // socket.on('connect', () => console.log('Connected to chat server'));
            // socket.emit('chat message', { content: inputMessage, userId: '65f8d2cfaea5f502f38acd1c' }, async (response) => {
            //     if (response.success) {
            //         const userNickname = await AsyncStorage.getItem('nickname');
            //         setMessages([...messages, { text: inputMessage, sender: userNickname, time: "2024-04-14T19:55:41.455Z" }]);
            //     } else return Alert.alert('Error', 'An error occurred while trying to send the message');
            // });
        }
    };

    const formatDate = (dateToFormat) => {
        const date = new Date(dateToFormat);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}-${month}-${year} · ${hours}:${minutes}`;
    }

    const getAllMessages = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await fetch(`${API_ROOT}/api/messages/`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if(response.status !== 200) return Alert.alert('Error', 'Error server response getting chat messages');

            const data = await response.json();
            return setMessages(data)
        } catch (error) {
            return Alert.alert('Error', 'An error occurred while trying to get the messages');
        }
    };

    useEffect(() => {
        const socket = io(CHAT_SERVER, { reconnectionDelayMax: 10000 });
        setSocketClient(socket);
        getAllMessages();
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flex1}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Chat General</Text>
            </View>
            <ScrollView 
                style={styles.container}
                contentContainerStyle={styles.containerChat}
            >
                <View style={styles.messageContainer}>
                    {messages.map((message, index) => (
                        <View key={index} style={styles.message}>
                            <Text style={styles.messageSender}>{message.user.nickname}</Text>
                            <Text style={styles.messageText}>{message.message.content}</Text>
                            <Text style={styles.messageTime}>{formatDate(message.message.createdAt)}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write your message here..."
                        value={inputMessage}
                        onChangeText={setInputMessage}
                        placeholderTextColor={'#444747'}
                    />
                    <TouchableOpacity 
                        style={styles.sendButton} 
                        onPress={handleMessageSend}
                        disabled={inputMessage.trim() === ''}
                    >
                        <Ionicons name="arrow-up" size={20} color={inputMessage.trim() === '' ? '#e0e3e3' : 'black'} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    header: {
        alignItems: 'flex-start',
        backgroundColor: '#151515',
        paddingHorizontal: 20,
        paddingTop: 50,
        gap: 15,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: 'Jura_400Regular'
    },
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    containerChat: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    messageContainer: {
        marginBottom: 70,
    },
    message: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        fontFamily: 'Jura_400Regular'
    },
    messageSender: {
        fontSize: 16,
        color: '#3C5252',
        fontFamily: 'Jura_400Regular'
    },
    messageText: {
        fontSize: 15,
        fontFamily: 'Jura_400Regular',
        color: '#FFFFFF',
    },
    messageTime: {
        fontSize: 12,
        color: '#828c8c',
        alignSelf: 'flex-end',
        fontFamily: 'Jura_400Regular'
    },
    inputContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8A909033',
        borderWidth: 2,
        borderColor: '#3C5252',
        borderRadius: 25,
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: 'Jura_400Regular',
        color: '#FFFFFF',
    },
    sendButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 1,
        marginRight: 10,
    },
});

export default GeneralChat;
