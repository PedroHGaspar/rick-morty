import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../App.css";

const CharacterList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // Adicione o estado para o filtro de status

  useEffect(() => {
    const fetchCharacters = async (searchTerm, statusFilter) => {
      try {
        let url = "https://rickandmortyapi.com/api/character";

        if (searchTerm) {
          url += `?name=${searchTerm}`;
        }

        if (statusFilter) {
          url += url.includes("?")
            ? `&status=${statusFilter}`
            : `?status=${statusFilter}`;
        }

        const response = await axios.get(url);
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      }
    };

    fetchCharacters(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]); // Adicione statusFilter como dependência

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title-header">Lista de Personagens</h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input-pesquisar"
        />
        <select
          className="input-pesquisar"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="">Todos</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {searchResults.length === 0 ? (
        <p>NÃO HÁ PERSONAGENS</p>
      ) : (
        <ul className="lista-personagens">
          {searchResults.map((character) => (
            <li className="personagem-unico" key={character.id}>
              <Link to={`/character/${character.id}`}>
                <img
                  className="img-personagem"
                  src={character.image}
                  alt={character.name}
                />
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
