import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../App.css";

const CharacterList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchCharacters = async (searchTerm) => {
      try {
        const url = searchTerm
          ? `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
          : "https://rickandmortyapi.com/api/character";
        const response = await axios.get(url);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      }
    };

    fetchCharacters(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title-header">Lista de Personagens</h1>
      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={handleSearchChange}
        className="input-pesquisar"
      />
      {searchResults.length === 0 ? (
        <p>NÃO HÁ PERSONAGENS</p>
      ) : (
        <ul className="lista-personagens">
          {searchResults.map((character) => (
            <li className="personagem-unico" key={character.id}> 
              <Link to={`/character/${character.id}`}>
                <img className="img-personagem" src={character.image} alt={character.name} />
                <p className="nome-personagem">{character.name}</p>
                <p className="status-personagem">Status: {character.status}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterList;
