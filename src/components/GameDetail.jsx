import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import TranslateComponent from "./TranslateComponent";

const GameDetail = () => {
  const { id } = useParams(); // Obtener el ID del juego desde la URL
  const [game, setGame] = useState(null);

  const navigate = useNavigate();
  const handleGoBack = () => navigate("/");

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}`,
          {
            params: {
              key: import.meta.env.VITE_API_RAWG
            },
            headers: {
              "Accept-Language": "es" // Intentar obtener la descripción en español
            }
          }
        );
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (!game) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <TranslateComponent />
      <Box sx={{ mt: 2, mb: 5 }}>
        <Button
          variant="contained"
          onClick={handleGoBack}
          color="primary"
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4">{game.name}</Typography>
        <img src={game.background_image} alt={game.name} width="100%" />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {game.description_raw || "Descripción no disponible en español."}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Fecha de lanzamiento: {game.released}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Rating: {game.rating}
        </Typography>
        <Button
          variant="contained"
          onClick={handleGoBack}
          color="primary"
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Box>
    </Container>
  );
};

export default GameDetail;
