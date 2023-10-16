import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "../App.css";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]); // Adicione o estado para os episódios

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(response.data);

        // Obtenha detalhes dos episódios do personagem
        const episodeRequests = response.data.episode.map((episodeURL) =>
          axios.get(episodeURL)
        );
        const episodesResponse = await Promise.all(episodeRequests);
        const episodeData = episodesResponse.map((response) => response.data);
        setEpisodes(episodeData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do personagem:", error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

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
          <p className="status-personagem-detalhes">Status: {character.status}</p>
          <p className="status-personagem-detalhes">Espécie: {character.species}</p>
          
          <div>
            <h2 className="detalhes-personagem">Episódios do Personagem</h2>
            <ul className="lista-episodios">
              {episodes.map((episode) => (
                <li className="lista-unicos-episodios" key={episode.id}>
                  <p className="epidosios-nomes" to={`/episode/${episode.id}`}>{episode.name} - {episode.episode}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default CharacterDetails;
