/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Alert
} from "@mui/material";
import useSaveFavorites from "../hooks/useSaveFavorites";

const SaveFavoritesButton = ({ favorites }) => {
  const {
    openModal,
    username,
    statusMessage,
    handleOpenModal,
    handleCloseModal,
    handleUsernameChange,
    handleSubmitFavorites
  } = useSaveFavorites(favorites);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ position: "fixed", top: 16, right: 16 }}
      >
        Guardar Favoritos
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Ingrese su nombre de usuario
          </Typography>
          <TextField
            fullWidth
            label="Nombre de Usuario"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitFavorites}
            sx={{ mt: 2 }}
          >
            Enviar Favoritos
          </Button>

          {/* Mostrar mensaje de estado */}
          {statusMessage && (
            <Alert severity={statusMessage.type} sx={{ mt: 2 }}>
              {statusMessage.text}
            </Alert>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default SaveFavoritesButton;
