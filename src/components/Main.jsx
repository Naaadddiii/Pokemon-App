import React from "react";
import Card from "./Card/Card";
import Pokeinfo from "./Pokeinfo/Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Search from "./Search/Search";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokeDex, setPokeDex] = useState();
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const url = "https://pokeapi.co/api/v2/pokemon/";

  const pokeFun = async (page) => {
    setLoading(true);
    const res = await axios.get(`${url}?limit=10&offset=${(page - 1) * 10}`);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.forEach(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => [...state, result.data]);
    });
  };

  useEffect(() => {
    pokeFun(page);
  }, [url, page]);

  const fetchSearch = async (value) => {
    if (value) {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${value}`
        );
        setPokeData([result.data]);
      } catch (e) {
        console.log(e);
      }
    } else {
      setPokeData([]);
      setPage(1);
      setCanLoadMore(true);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      canLoadMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="header">
        <h2>POKEMON APP</h2>
      </div>
      <div className="search-filter-container">
        <Search fetchSearch={fetchSearch} />
        <NavLink to="/favourites">
          <Button variant="contained" className="add-fav">
            Favourites
          </Button>
        </NavLink>
      </div>
      <div className="container">
        <div className="left-content">
          {pokeData.length > 0 && (
            <Card
              key={pokeData.id}
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />
          )}
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default Main;

