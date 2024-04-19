import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";

const UserSettings = () => {
  const navigation = useNavigation();
    const [editMode, setEditMode] = useState(false);
    const [token, setToken] = useState("");
    const [url_image, setUrlImage] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");
        const userNickname = await AsyncStorage.getItem("nickname");
        const userEmail = await AsyncStorage.getItem("email");
        const userUrlImage = await AsyncStorage.getItem("url_image") || url_image;
  
        setToken(userToken);
        setNickname(userNickname || "");
        setEmail(userEmail || "");
        setUrlImage(userUrlImage);
      } catch (error) {
        Alert.alert("Error", "Something went wrong trying to get user data.");
      }
    };

    const handleConfirmDelete = async () => {
      try {
        const response = await fetch(`${API_ROOT}/api/users/delete`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
  
        if(response.status !== 200) return Alert.alert('Error', 'Server error trying to delete your profile.');
  
        await AsyncStorage.clear();
        return navigation.navigate("Welcome");
      } catch (error) {
        return Alert.alert("Error", "Something went wrong trying to delete your profile.");
      }
    };

    const logout = async () => {
      await AsyncStorage.clear();
      return navigation.navigate("Welcome");
    };

    const handleConfirmChanges = async () => {
      console.log("Changes confirmed");
      console.log(token)
      console.log(nickname)
      console.log(email)
      console.log(password)
      console.log(url_image)
      setEditMode(false);
      return setPassword("");
    }

    useEffect(() => {
      getUserData();

      return () => {
        setPassword("");
      }
    }, []);

    return (
      <View style={style.container}>
        <HomeTemplateComponent/>
        <View style={style.card}>
          {!editMode && (
            <View style={style.btnEdit}>
              <TouchableOpacity onPress={() => setEditMode(true)}>
                <Text style={style.changeImage}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={style.containerImage}>
            {editMode ? (
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                style={style.inputNickname}
              />
            ) : (
              <Text style={style.nickname}>{nickname}</Text>
            )}
            <Image
              source={{uri: url_image}}
              style={{width: 120, height: 140}}
            />
            {editMode && (
              <TouchableOpacity onPress={() => console.log("Change photo")}>
                <Text style={style.changeImage}>Change</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={style.containerInput}>
            <View style={style.inputName}>
              <Text style={style.name}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                editable={editMode}
                style={[style.input, !editMode && {borderColor: 'transparent', padding: 0}]}
              />
            </View>

            { editMode && (
              <View style={style.inputName}>
                <Text style={style.name}>Password</Text>
                <TextInput
                  placeholder="change your password here"
                  placeholderTextColor={"#384948"}
                  value={password}
                  onChangeText={setPassword}
                  editable={editMode}
                  secureTextEntry={true}
                  style={style.input}
                />
              </View>
            )}

            {editMode && (
              <TouchableOpacity style={style.btn} onPress={handleConfirmChanges}>
                <Text style={style.save}>Confirm Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        <View style={style.redContainer}>
          {editMode ? (
            <TouchableOpacity onPress={() => console.log("Deleting account")}>
              <Text style={style.red}>I want to delete my profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logout}>
              <Text style={style.red}>Log Out</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151515'
  },
  card:{
    width: 315,
    height: 510,
    backgroundColor: 'rgba(60, 82, 82, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  containerImage:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    gap: 20,
  },
  containerInput:{
    paddingTop: 40,
    gap: 30,
    alignItems: 'center',
  },
  inputName:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  input: { 
    height: 40,
    borderWidth: 0.5,
    width: 170,
    color: 'white',
    borderRadius: 10,
    padding: 10,
    borderColor: '#8CCECC'
  },
  inputNickname: { 
    height: 40,
    color: 'white',
    borderWidth: 0.5,
    width: 150,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
    borderColor: '#8CCECC'
  },
  name:{
    color: '#8CCECC',
    fontFamily: 'Jura_400Regular',
    fontSize: 12,
  },
  nickname:{
    color: '#8cceccc8',
    fontFamily: 'Jura_Bold700',
    fontSize: 20,
  },
  changeImage:{
    color: '#3C5252',
    fontFamily: 'Jura_400Regular',
    fontSize: 11,
    textAlign: 'center',
  },
  btn:{
    width: 215,
    height: 42,
    backgroundColor: '#3C5252',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  save:{
    color: 'white',
    fontFamily: 'Jura_400Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  red:{
    color: 'red',
    fontFamily: 'Jura_400Regular',
    fontSize: 15,
    right: 0,
  },
  redContainer:{
    paddingTop: 20,
    width: 315,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  btnEdit:{
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default UserSettings;

