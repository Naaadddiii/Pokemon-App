import { Search } from "@mui/icons-material";
import { Bookmark } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { pokemonTypes } from "../../pokemonTypes";
import { NavLink } from "react-router-dom";

import "./Pokeinfo.css";

const Pokeinfo = ({ data }) => {
  const statsContent = [
    { title: "HP", field: "hp" },
    { title: "Attack", field: "attack" },
    { title: "Defense", field: "defense" },
    { title: "Special Attack", field: "specialAttack" },
    { title: "Special Defense", field: "specialDefense" },
    { title: "Speed", field: "speed" },
  ];

  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((favorite) => favorite.id === data?.id));
  }, [data]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
     
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== data?.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      
      const newFavorite = { id: data?.id, name: data?.name };
      const updatedFavorites = [...favorites, newFavorite];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
      setSnackbarOpen(true); 
    }
  };

  return (
    <>
      {!data ? (
        ""
      ) : (
        <div className="info-card">
          <h1 className="info-name">{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`}
            alt=""
            height={160}
          />
          <div className="abilities">
            {data.types.map((poke) => {
              const [{ name, color }] = pokemonTypes.filter(
                (item) => item.name === poke.type.name
              );

              const imgUrl = require(`/src/assets/pokemonTypes/${name}.svg`);

              return (
                <div
                  key={poke.type.name}
                  className="type"
                  style={{ backgroundColor: `${color}` }}
                >
                  <img
                    src={imgUrl}
                    width={16}
                    height={16}
                    alt={name}
                    color={color}
                  />
                  <span>{poke.type.name}</span>
                </div>
              );
            })}
          </div>
          <div className="abilities">
            {data?.abilities.map((item) => {
              return <h2 className="group">{item.ability?.name}</h2>;
            })}
          </div>
          <div className="base-stat">
            {statsContent &&
              statsContent.map((stat, index) => (
                <div className="row" key={stat.field}>
                  <strong>{stat.title}</strong>
                  <span>{data?.stats[index].base_stat || 1}</span>
                </div>
              ))}
          </div>
          <NavLink
            key={`${data.name}-link`}
            style={{ textDecoration: "none" }}
            to={data.name && `/${data.name}`}
          >
            <Button variant="contained" className="view-more">
              <Search />
              View More
            </Button>
          </NavLink>
          <Button
            variant="contained"
            className="view-more"
            onClick={handleFavoriteClick}
          >
            <Bookmark />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Added to Favorites"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
};

export default Pokeinfo;
