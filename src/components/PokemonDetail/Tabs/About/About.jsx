import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

const About = ({ pokemon, pokemonSpecies }) => {
  const [flavorText, setFlavorText] = useState("");
  useEffect(() => {
    if (pokemon.data) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.data?.id}`)
        .then((result) => {
          const data = result.data;
          const fileterdFlavorTextEntries = data.flavor_text_entries.filter(
            (element) => element.language.name === "en"
          );
          const flavorTextEntry =
            fileterdFlavorTextEntries.length > 0
              ? fileterdFlavorTextEntries[0]
              : {};

          data.flavor_text_entries = [flavorTextEntry];
          const flavorText = flavorTextEntry.flavor_text;

          setFlavorText(flavorText);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [flavorText, pokemon.data?.id]);

  return (
    <div className="about">
      <span className="flavor-text">{flavorText}</span>
      <div className="pokemon-data">
        <div className="about-group">
          <h3>Pokemon Data</h3>
          <ul>
            <li>
              <strong>Species</strong>{" "}
              <span style={{ textTransform: "capitalize" }}>
                {pokemon.data?.species?.name}
              </span>
            </li>
            <li>
              <strong>Height</strong> <span>{pokemon.data?.height / 10} m</span>
            </li>
            <li>
              <strong>Weight</strong>{" "}
              <span>{pokemon.data?.weight / 10} kg</span>
            </li>
          </ul>
        </div>
        <div className="about-group">
          {pokemonSpecies && (
            <>
              <h3>Training</h3>
              <ul>
                <li>
                  <strong>Catch Rate</strong>
                  <span>{pokemonSpecies.data?.capture_rate || "N/A"}</span>
                </li>
                <li>
                  <strong>Base Friendship</strong>
                  <span>{pokemonSpecies.data?.base_happiness || "N/A"}</span>
                </li>
                <li>
                  <strong>Growth Rate</strong>
                  <span>{pokemonSpecies.data?.growth_rate.name || "N/A"}</span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
