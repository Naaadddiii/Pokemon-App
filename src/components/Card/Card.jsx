
import React from "react";
import "./Card.css";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          if (item.name) {
            return (
              <div className="card" 
              key={item.id} 
              onClick={() => infoPokemon(item)}
              style={{ backgroundColor: "white" }}
              >
                <span className="card-name">#{item.id}</span>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.id}.png`}
                  height={128}
                  width={128}
                  alt=""
                />
                <span className="card-name">{item.name}</span>
              </div>
            );
          }
          return null;
        })
      )}
    </>
  );
};

export default Card;

