import { useState } from "react";
import axios from "axios";

const useSaveFavorites = (favorites) => {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
    setStatusMessage(null); // Resetear el mensaje de estado al abrir el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmitFavorites = async () => {
    if (!username || favorites.length === 0) {
      setStatusMessage({
        type: "error",
        text: "Debe ingresar un nombre de usuario y tener al menos un favorito."
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/save-favorites",
        {
          username,
          favorites
        }
      );
      setStatusMessage({ type: "success", text: response.data });
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: `Error guardando los favoritos. ${error.message}`
      });
    }
  };

  return {
    openModal,
    username,
    statusMessage,
    handleOpenModal,
    handleCloseModal,
    handleUsernameChange,
    handleSubmitFavorites
  };
};

export default useSaveFavorites;
