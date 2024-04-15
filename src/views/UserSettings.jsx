import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componentes
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import ModalPop from "../components/containers/ModalPop";

const UserSettings = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url_image, setUrlImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const getUserData = async () => {
    try {
      const userNickname = await AsyncStorage.getItem("nickname");
      const userEmail = await AsyncStorage.getItem("email");
      const userUrlImage = await AsyncStorage.getItem("url_image") || url_image;

      setNickname(userNickname || "");
      setEmail(userEmail || "");
      setUrlImage(userUrlImage);
    } catch (error) {
      Alert.alert("Error", "Something went wrong trying to get user data.");
    }
  };

  const toggleEdit = useCallback(() => {
    setIsEditing(prevState => !prevState);
  }, []);

  const handleConfirmChanges = useCallback(() => {
    setIsEditing(false);
    setShowPassword(true);
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalVisible(prevState => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLogoutVisible(prevState => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCloseLogout = useCallback(() => {
    setIsLogoutVisible(false);
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Welcome");
  };

  useEffect(() => {
    getUserData();
  }, []);

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
              source={{ uri: url_image }}
              style={{ width: 120, height: 200 }}
            />

            {isEditing ? (
              <TextInput
                style={styles.name}
                value={nickname}
                editable={isEditing}
                onChangeText={setNickname}
              />
            ) : (
              <Text style={styles.name}>{nickname}</Text>
            )}
          </View>

          <View style={styles.containerInput}>

              <View style={styles.containerInputName}>
                <Text style={styles.nameInput}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  editable={isEditing}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.containerInputName}>
                <Text style={styles.nameInput}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  editable={isEditing}
                  onChangeText={setPassword}
                />
              </View>

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
        body={"Are you sure you want to log out?"}
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
    gap: 10,
  },
  name: {
    color: "#ffffff",
    fontSize: 16,
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
  nameInput: {
    color: "#3C5252",
    fontSize: 15,
    fontFamily: "Jura_400Regular",
  },
  containerInputName:{
    width: 280,
    gap: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
    color: '#ffffff',
    padding: 10,
},
});

export default UserSettings;
