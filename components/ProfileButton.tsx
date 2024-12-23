import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

const ProfileButton = () => {
  const { signOut, user } = useAuth();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const toggleProfileModal = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      {/* Profile Button */}
      <TouchableOpacity onPress={toggleProfileModal} style={styles.profileButton}>
        <Image
          source={{
            uri: "https://via.placeholder.com/150", // Dummy profile picture
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Profile Modal */}
      <Modal
        visible={isProfileModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleProfileModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profile</Text>
            <Image
              source={{
                uri: "https://via.placeholder.com/150", // Dummy profile picture
              }}
              style={styles.profileImageLarge}
            />
            <Text style={styles.profileText}>Name: {user?.name || "N/A"}</Text>
            <Text style={styles.profileText}>Email: {user?.email || "N/A"}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleProfileModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 15,
  },
  profileImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#007BFF",
  },
  profileText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  signOutButton: {
    flex: 1,
    backgroundColor: "#FF4D4D",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileButton;