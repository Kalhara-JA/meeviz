import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { signUp } = useAuth();

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        if (name && email && password) {
            signUp(name, email, password);
            Alert.alert(
                "Success",
                "Sign-up successful! Please sign in to continue.",
                [
                    {
                        text: "OK",
                        onPress: () => router.push("/signin"), // Redirect to Sign In page
                    },
                ]
            );
        } else {
            Alert.alert("Error", "Please fill in all fields");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                placeholder="Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Sign Up" onPress={handleSignUp} />

            {/* Text for navigation to Sign In page */}
            <View style={styles.signinContainer}>
                <Text style={styles.signinText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/signin")}>
                    <Text style={styles.signinLink}> Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    signinContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    signinText: { fontSize: 16 },
    signinLink: { fontSize: 16, color: "blue", fontWeight: "bold" },
});

export default SignUp;