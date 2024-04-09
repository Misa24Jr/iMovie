import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_ROOT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componentes
import { getAndSetToken } from "../utils/tokenHandler";
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import UserInput from "../components/inputs/UserInput";
import ModalPop from "../components/containers/ModalPop";

const UserSettings = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("misa24jr");
  const [url_image, setUrlImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const [token, setToken] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const getUserData = async () => {
    try {
      const [token, userNickname, userEmail, userUrlImage] = await Promise.all([
        getAndSetToken(setToken),
        AsyncStorage.getItem("nickname"),
        AsyncStorage.getItem("email"),
        AsyncStorage.getItem("url_image")
      ]);
      setEmail(userEmail);
      setNickname(userNickname);
      setUrlImage(userUrlImage);
    } catch (error) {
      return Alert.alert("Error", "Something went wrong trying to get user data.");
    }
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setShowPassword(!isEditing);
  };

  const handleConfirmChanges = () => {
    setIsEditing(false);
    setShowPassword(true);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLogout = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleCloseLogout = () => {
    setIsLogoutVisible(false);
  };

  const logout = () => {
    AsyncStorage.clear();
    return navigation.navigate("Welcome");
  };

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <View style={styles.container}>
      <HomeTemplateComponent />
      <View style={styles.containerBody}>
        <View style={styles.containerCard}>
          <TouchableOpacity onPress={toggleEdit}>
            <Text style={styles.link}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.containerImage}>
            <Image
              source={{
                uri: url_image,
              }}
              style={{ width: 120, height: 200 }}
            />
            <UserInput
              value={nickname}
              editable={isEditing}
              onChangeText={setNickname}
            />
          </View>
          <View style={styles.containerInput}>
            <UserInput
              name="Email"
              value={email}
              editable={isEditing}
              onChangeText={setEmail}
            />
            <UserInput
              name="Password"
              value={password}
              secureTextEntry={showPassword}
              editable={isEditing}
              onChangeText={setPassword}
            />
            {isEditing && (
              <TouchableOpacity
                onPress={handleConfirmChanges}
                style={styles.BtnSave}
              >
                <Text style={styles.textSave}>Confirm Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Aquí se maneja la condición para mostrar uno u otro botón */}
        {isEditing ? (
          <TouchableOpacity onPress={toggleModal} style={styles.textDelete}>
            <Text style={styles.linkDelete}>I want to delete my profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleLogout} style={styles.textDelete}>
            <Text style={styles.linkDelete}>Log out</Text>
          </TouchableOpacity>
        )}
      </View>
      <ModalPop
        handleClose={handleClose}
        visible={isModalVisible}
        toggleModal={toggleModal}
        body={"Are you sure you want to delete your profile?"}
      />
      <ModalPop
        handleClose={handleCloseLogout}
        visible={isLogoutVisible}
        toggleModal={handleLogout}
        body={"Are you sure you want to close your profile?"}
        handleSumit={logout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151515",
    height: "100%",
    alignItems: "center",
  },
  containerBody: {
    top: 150,
  },
  containerCard: {
    width: 330,
    height: 510,
    backgroundColor: "#1c1c1c",
    borderRadius: 20,
    padding: 20,
    gap: 50,
  },
  link: {
    color: "#3C5252",
    fontSize: 12,
    fontFamily: "Jura_400Regular",
  },
  linkDelete: {
    color: "#ff0000",
    fontSize: 12,
    fontFamily: "Jura_400Regular",
  },
  containerImage: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Jura_400Regular",
  },
  containerInput: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  BtnSave: {
    width: 212,
    height: 40,
    backgroundColor: "#3C5252",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  textSave: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Jura_400Regular",
  },
  textDelete: {
    alignItems: "flex-end",
    padding: 20,
  },
  btnLogout: {
    alignItems: "flex-end", // Ajusta esto según sea necesario
  },
  linkLogout: {
    color: "#ff0000", // Este es solo un ejemplo, ajusta el color como prefieras
    fontSize: 12,
    fontFamily: "Jura_400Regular",
  },
});

export default UserSettings;
