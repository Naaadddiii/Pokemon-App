import { Tooltip, Card, CardContent, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Favourites.css";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favourites-container">
      <NavLink to="/">
        <Tooltip title="Back">
          <ArrowBackIosIcon className="back-button" fontSize="large" />
        </Tooltip>
      </NavLink>
      <h1 className="header">Favourites</h1>
      <div className="card-container">
        {favorites.map((favorite) => (
          <Card key={favorite.id} className="favorite-card">
            <CardContent>
               <span className="poke-id">#{favorite.id}</span>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${favorite.id}.png`}
                    height={128}
                    width={128}
                    alt=""
                  />
                  <span className="poke-name">{favorite.name}</span>
              <IconButton
                aria-label="Remove from favorites"
                onClick={() => removeFromFavorites(favorite.id)}
                className="delete"
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
