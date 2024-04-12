import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, TouchableOpacity, View, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const GeneralChat = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleMessageSend = () => {
        if (inputMessage.trim() !== '') {
            const now = new Date();
            const formattedTime = `${now.getHours()}:${now.getMinutes()}`;
            setMessages([...messages, { text: inputMessage, sender: 'Misa24jr', time: formattedTime }]);
            setInputMessage('');
        }
    };

    return(
        <>
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
                            <Text style={styles.messageSender}>{message.sender}</Text>
                            <Text style={styles.messageText}>{message.text}</Text>
                            <Text style={styles.messageTime}>{message.time}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Whire your message here..."
                        value={inputMessage}
                        onChangeText={setInputMessage}
                        placeholderTextColor={'#444747'}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleMessageSend}>
                        <Ionicons name="arrow-up" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}; 

const styles = StyleSheet.create({
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
        fontSize: 12,
        fontFamily: 'Jura_400Regular',
        color: '#FFFFFF',
    },
    messageTime: {
        fontSize: 12,
        color: '#3C5252',
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
