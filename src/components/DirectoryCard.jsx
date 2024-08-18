/* eslint-disable react/prop-types */
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

const DirectoryCard = ({ dir, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/game/${dir.id}`);
  };

  return (
    <Card
      component="li"
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%" // Asegura que todas las cards tengan el mismo alto
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={dir.background_image}
        alt={dir.name}
        sx={{
          height: 140, // Altura fija para la imagen, ajusta según necesites
          objectFit: "contain"
        }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{dir.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="body2">Rating: {dir.rating}</Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(dir);
            }}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
        <Typography variant="body2">Release Date: {dir.released}</Typography>
      </CardContent>
    </Card>
  );
};

export default DirectoryCard;
