import { Alert } from "react-native";

class InputValidator {
    static loginInputsValidation(nickname, password) {
        if(nickname.length < 5){
            Alert.alert('Invalid Input', 'Nickname must be at least 5 characters.');
            return false;
        }
        if(password.length < 8){
            Alert.alert('Invalid Input', 'Password must be at least 8 characters.');
            return false;
        }
        return true;
    }

    static registerInputsValidation(email, nickname, password) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (emailRegex.test(email) === false) {
            Alert.alert('Invalid Input', 'Invalid email format.');
            return false;
        }
        if(nickname.length < 5){
            Alert.alert('Invalid Input', 'Nickname must be at least 5 characters long.');
            return false;
        }
        if (password.length < 8) {
            Alert.alert('Invalid Input', 'Password must be at least 8 characters long.');
            return false;
        }
        return true;
    }
}

export default InputValidator;