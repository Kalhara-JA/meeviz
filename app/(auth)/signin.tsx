import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { signIn } = useAuth();

    const handleSignIn = () => {
        if (email && password) {
            const isAuthenticated = signIn(email, password);
            if (!isAuthenticated) {
                alert("Invalid credentials");
                return;
            }
            router.push("/home");
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
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
            <Button title="Sign In" onPress={handleSignIn} />

            {/* Additional Text for Sign Up */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/signup")}>
                    <Text style={styles.signupLink}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    signupContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    signupText: { fontSize: 16 },
    signupLink: { fontSize: 16, color: "blue", fontWeight: "bold" },
});

export default SignIn;