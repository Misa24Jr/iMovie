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
  const [url_image, setUrlImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prevNickname, setPrevNickname] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [prevUrlImage, setPrevUrlImage] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      const userNickname = await AsyncStorage.getItem("nickname");
      const userEmail = await AsyncStorage.getItem("email");
      const userUrlImage = await AsyncStorage.getItem("url_image") || url_image;

      setToken(userToken);
      setPrevNickname(userNickname || "");
      setNickname(userNickname || "");
      setPrevEmail(userEmail || "");
      setEmail(userEmail || "");
      setPrevUrlImage(userUrlImage);
      setUrlImage(userUrlImage);
    } catch (error) {
      Alert.alert("Error", "Something went wrong trying to get user data.");
    }
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

  return (
    <View style={style.container}>
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
              setUrlImage(prevUrlImage);
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
    height: 540, // Altura más grande cuando está en modo de edición
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
