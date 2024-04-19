import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";

// Components
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";

const UserSettings = () => {
    const [editMode, setEditMode] = useState(false);
    const [nickname, setNickname] = useState("Misa24jr");
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("password123");

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
                autoFocus
              />
            ) : (
              <Text style={style.nickname}>{nickname}</Text>
            )}
            <Image
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
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
                style={style.input}
              />
            </View>

            <View style={style.inputName}>
              <Text style={style.name}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                editable={editMode}
                secureTextEntry={true}
                style={style.input}
              />
            </View>

            {editMode && (
              <TouchableOpacity style={style.btn} onPress={() => setEditMode(false)}>
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
            <TouchableOpacity onPress={() => console.log("Logging out")}>
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
    backgroundColor: '#151515',
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
    gap: 10,
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
  width: 150,
  color: 'white',
  borderRadius: 10,
  padding: 5,
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
  color: 'white',
  fontFamily: 'Jura_400Regular',
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

