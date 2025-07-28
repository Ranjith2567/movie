
import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponents";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin: 10px;
  }
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 10px;
  }
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin: 80px auto;
  }
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
