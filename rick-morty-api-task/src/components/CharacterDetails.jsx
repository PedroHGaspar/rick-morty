import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "../App.css";

const CharacterDetails = () => {
  const { id } = useParams(); // Obtenha o 'id' da URL usando useParams
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // Função para buscar os detalhes do personagem na API
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do personagem:", error);
      }
    };

    fetchCharacterDetails();
  }, [id]); // Certifique-se de incluir 'id' como dependência

  if (!character) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="link-voltar">
        <Link className="color-arrow" to="/">🡸</Link>
      </div>
      {character ? (
        <div>
          <h2 className="detalhes-personagem">Detalhes do Personagem</h2>
          <img
            className="img-personagem"
            src={character.image}
            alt={character.name}
          />
          <p className="nome-personagem-detalhes">Nome: {character.name}</p>
          <p className="status-personagem-detalhes">
            Status: {character.status}
          </p>
          <p className="status-personagem-detalhes">
            Espécie: {character.species}
          </p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default CharacterDetails;
