import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_ROOT } from "@env";
// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import ModalPop from "../components/containers/ModalPop";

const UserSettings = () => {
  const [editMode, setEditMode] = useState(false);
  const [token, setToken] = useState("");
  const [url_image, setUrlImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prevNickname, setPrevNickname] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLogOut, setModalLogOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem("token");
      const userNickname = await AsyncStorage.getItem("nickname");
      const userEmail = await AsyncStorage.getItem("email");
      const userUrlImage = await AsyncStorage.getItem("url_image") || url_image;

      setToken(userToken);
      setPrevNickname(userNickname || "");
      setNickname(userNickname || "");
      setPrevEmail(userEmail || "");
      setEmail(userEmail || "");
      setUrlImage(userUrlImage);
    } catch (error) {
      Alert.alert("Error", "Something went wrong trying to get user data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmChanges = async () => {
    if(nickname === "" && email === "" && password === "") {
      setEditMode(false);
      return Alert.alert("Error", "You can't update your profile with nickname, email and password empty.");
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(`${API_ROOT}/api/users/update`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ newNickname: nickname, newEmail: email, newPassword: password})
      });

      if(response.status !== 200) {
        setEditMode(false);
        setIsLoading(false);
        return Alert.alert('Error', 'Server error trying to update your profile.');
      }

      await AsyncStorage.setItem("nickname", nickname);
      await AsyncStorage.setItem("email", email);

      setEditMode(false);
      setIsLoading(false);
      return;
      
    } catch (error) {
      setEditMode(false);
      setIsLoading(false);
      return Alert.alert("Error", "Something went wrong trying to update your profile.");
    }
  }

  const handleConfirmDelete = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModalLogOut = () => {
    setModalLogOut(!modalLogOut);
  };
  const handleCloseLogOut = () => {
    setModalLogOut(false);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };
  const logOut = () =>{
    AsyncStorage.clear();
    navigation.navigate("Welcome");
  }; 

  return (
    <View style={style.container}>
      {isLoading && (
        <ActivityIndicator size="large" color="#3C5252" />
      )}
      <ModalPop
        body={"Are you sure you want to delete your account?"}
        handleSumit={handleConfirmDelete}
        visible={isModalVisible}
        handleClose={handleClose}
      />

      <ModalPop
        body={"Are you sure you want to log out?"}
        handleSumit={logOut}
        visible={modalLogOut}
        handleClose={handleCloseLogOut}
      />
      <HomeTemplateComponent/>
      <View style={[style.card, editMode && style.largeCard]}>
        {!editMode ? (
          <View style={style.btnEdit}>
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Text style={style.changeImage}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={style.btnEdit}>
            <TouchableOpacity onPress={() => {
              setEditMode(false);
              setNickname(prevNickname);
              setEmail(prevEmail);
              setPassword(prevPassword);
            }}>
              <Text style={style.editCancel}>Cancel</Text>
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
      {editMode ? (
          <TouchableOpacity style={style.redContainer} onPress={toggleModal}>
              <Text style={style.red}>Delete Account</Text>
          </TouchableOpacity>
      ):(
        <TouchableOpacity style={style.redContainer} onPress={toggleModalLogOut}>
          <Text style={style.red}>Log out</Text>
        </TouchableOpacity>
      )}
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
    height: 330, // Altura inicial más pequeña
    backgroundColor: 'rgba(60, 82, 82, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  largeCard: {
    height: 520, // Altura más grande cuando está en modo de edición
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
  editCancel:{
    color: 'red',
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