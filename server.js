import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;
const directoryPath = path.join(process.cwd(), "juegos");

const jsonFilePath = path.join(process.cwd(), "data/games.json");

app.use(cors());
app.use(bodyParser.json());
app.use("/", express.static(path.join(directoryPath)));

// Endpoint para guardar los favoritos
app.post("/api/save-favorites", (req, res) => {
  const { username, favorites } = req.body;

  if (!username || !favorites) {
    return res
      .status(400)
      .send("Nombre de usuario y lista de favoritos son requeridos.");
  }

  const filePath = path.join(process.cwd(), `data/${username}_favorites.json`);
  const dataToSave = {
    username,
    favorites
  };

  fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), (err) => {
    if (err) {
      console.error("Error saving favorites:", err);
      return res.status(500).send("Error guardando los favoritos.");
    }
    res.send("Favoritos guardados correctamente.");
  });
});

app.get("/api/directories", (req, res) => {
  // Leer el archivo JSON
  fs.readFile(jsonFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo JSON:", err);
      return res.status(500).json({ error: "Error al leer los datos" });
    }

    try {
      const directories = JSON.parse(data);

      // Obtener parámetros de búsqueda, paginación, etc.
      const { page = 1, limit = 10, search = "" } = req.query;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      // Filtrar resultados según el término de búsqueda
      const filteredDirectories = directories.filter((dir) => {
        return (
          dir.directory_name.toLowerCase().includes(search.toLowerCase()) ||
          dir.text_file_content.toLowerCase().includes(search.toLowerCase())
        );
      });

      // Aplicar la paginación
      const paginatedResult = filteredDirectories.slice(startIndex, endIndex);
      const totalItems = filteredDirectories.length;
      const totalPages = Math.ceil(totalItems / limit);

      // Responder con los datos paginados
      res.json({
        page: parseInt(page),
        totalPages,
        totalItems,
        limit: parseInt(limit),
        data: paginatedResult
      });
    } catch (parseError) {
      console.error("Error al parsear el archivo JSON:", parseError);
      return res.status(500).json({ error: "Error al procesar los datos" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
