import { useState } from "react";
import { Container, Divider, Pagination, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DirectoryList from "./components/DirectoryList";
import SaveFavoritesButton from "./components/SaveFavoritesButton";
import GameDetail from "./components/GameDetail";
import usePagination from "./hooks/usePagination";
import useFavorites from "./hooks/useFavorites";
import TranslateComponent from "./components/TranslateComponent";

const App = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const limit = 8;

  const { page, totalPages, directories, setPage, loading } = usePagination(
    limit,
    query
  );
  const { favorites, toggleFavorite } = useFavorites();

  const handleSearchSubmit = (searchValue) => {
    setQuery(searchValue);
    setPage(1);
  };

  return (
    <Router>
      <Container sx={{ paddingTop: "80px", width: "100%" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
          Listado de Juegos PS3
        </Typography>

        <Routes>
          <Route
            path="/"
            element={
              <Container sx={{ width: "100%" }}>
                <TranslateComponent />
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  onSearchSubmit={handleSearchSubmit}
                />
                <Divider sx={{ margin: "20px 0" }} flexItem />
                <DirectoryList
                  directories={directories}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  loading={loading}
                />
                <Divider sx={{ margin: "20px 0" }} flexItem />
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                  sx={{ mt: 2 }}
                />
                <SaveFavoritesButton favorites={favorites} />
              </Container>
            }
          />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
