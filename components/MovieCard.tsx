import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useClickCount } from "../contexts/ClickCountContext";

const MovieCard = ({ movie }: { movie: any }) => {
  const router = useRouter();
  const { incrementCount } = useClickCount();

  const handlePress = () => {
    incrementCount(); // Increment the click count
    router.push(`/movie/${movie.id}`); // Navigate to the movie details screen
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/200x300.png?text=No+Image",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title || "Unknown Title"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0", // Placeholder color while the image loads
  },
  textContainer: {
    padding: 10,
    backgroundColor: "#f9f9f9", // Slightly lighter background for text
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default MovieCard;