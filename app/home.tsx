import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import ProfileButton from "../components/ProfileButton";
import MovieCard from "../components/MovieCard";
import FloatingButton from "../components/FloatingButton"; // Import FloatingButton
import axios from "axios";
import { useClickCount } from "@/contexts/ClickCountContext";

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = "b87e84676d6fb03a9146aaf0b6c71358";

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { count, incrementCount } = useClickCount();

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    setLoading(page === 1 && !refreshing);
    setLoadingMore(page > 1);
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page,
        },
      });
      setMovies((prevMovies) => {
        const newMovies =
          page === 1
            ? response.data.results // Replace movies on refresh
            : [...prevMovies, ...response.data.results]; // Append new movies

        return newMovies;
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleFloatingButtonPress = () => {
    alert(`You clicked ${count} times!`);
  };

  const handleMovieClick = () => {
    incrementCount();
  };

  const renderMovieCard = ({ item }: { item: any }) => (
    <MovieCard movie={item} />
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={styles.loadingMoreIndicator} size="large" color="#007BFF" />;
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>Meeviz</Text>
        <ProfileButton />
      </View>

      <Text style={styles.title}>Popular Movies</Text>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      {/* Floating Button */}
      <FloatingButton count={count} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#007BFF",
  },
  appName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  loadingMoreIndicator: {
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default Home;