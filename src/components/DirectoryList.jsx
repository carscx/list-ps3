/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography, Grid } from "@mui/material";
import DirectoryCard from "./DirectoryCard";

const DirectoryList = ({
  directories,
  favorites,
  onToggleFavorite,
  loading
}) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (directories.length === 0) {
    return <Typography>No se encontraron juegos.</Typography>;
  }

  return (
    <Grid container spacing={2} component="ul" sx={{ listStyle: "none", p: 0 }}>
      {directories.map((dir, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <DirectoryCard
            dir={dir}
            isFavorite={favorites.some((fav) => fav.id === dir.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DirectoryList;
