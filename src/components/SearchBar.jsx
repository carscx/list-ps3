/* eslint-disable react/prop-types */
// import { Box, TextField, Button } from "@mui/material";

// const SearchBar = ({ search, setSearch, onSearchSubmit }) => {
//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleSearchClick = () => {
//     onSearchSubmit(search);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       handleSearchClick();
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", mb: 2 }}>
//       <TextField
//         variant="outlined"
//         label="Buscar"
//         value={search}
//         onChange={handleSearchChange}
//         onKeyPress={handleKeyPress} // Detectar "Enter" para buscar
//         fullWidth
//       />
//       <Button variant="contained" onClick={handleSearchClick} sx={{ ml: 2 }}>
//         Buscar
//       </Button>
//     </Box>
//   );
// };

// export default SearchBar;

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

// export default function SearchBar({ search, setSearch, onSearchSubmit }) {
const SearchBar = ({ search, setSearch, onSearchSubmit }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    onSearchSubmit(search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <SportsEsportsIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Listado de juegos de PS3
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ "aria-label": "buscar" }}
              value={search}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
