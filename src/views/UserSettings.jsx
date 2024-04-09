import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// Componentes
import HomeTemplateComponent from "../components/containers/HomeTemplaneComponent";
import UserInput from "../components/inputs/UserInput";
import ModalPop from "../components/containers/ModalPop";

const UserSettings = () => {
  const [email, setEmail] = useState("misa24jr@gmail.com");
  const [password, setPassword] = useState("misa24jr");
  const [nickname, setNickname] = useState("Misa24jr");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

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
    console.log("Logout function");
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

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
                uri: "https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
            <Text style={styles.linkDelete}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
      <ModalPop
        handleClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
        toggleModal={toggleModal}
        body={"Are you sure you want to delete your profile?"}
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
