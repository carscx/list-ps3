// import { useState, useEffect } from "react";
// import axios from "axios";

// // 3c087394daf645e18fa9382cacaf89d9

// const usePagination = (limit, query, page) => {
//   const [totalPages, setTotalPages] = useState(1);
//   const [directories, setDirectories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/directories",
//           {
//             params: { page, limit, search: query }
//           }
//         );
//         setDirectories(response.data.data);
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [page, limit, query]); // Asegúrate de que `query` y `page` son dependencias

//   return {
//     totalPages,
//     directories
//   };
// };

// export default usePagination;
// key: import.meta.env.VITE_API_RAWG

import { useState, useEffect } from "react";
import axios from "axios";

const usePagination = (limit, query) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
          params: {
            platforms: 16, // PS3 Platform ID
            page: page,
            page_size: limit,
            search: query, // Añadimos el parámetro de búsqueda
            key: import.meta.env.VITE_API_RAWG
          }
        });

        setDirectories(response.data.results);
        setTotalPages(Math.ceil(response.data.count / limit)); // Calcula el total de páginas
      } catch (error) {
        console.error("Error fetching data from RAWG API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, query]);

  return {
    page,
    totalPages,
    directories,
    setPage,
    loading // Retornar el estado de carga
  };
};

export default usePagination;
