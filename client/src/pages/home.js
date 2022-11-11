import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import GameIcon from "@mui/icons-material/SportsEsports";
import Auth from "../utils/auth";

import { useMutation, useLazyQuery } from '@apollo/client';
import { QUERY_WORDS } from '../utils/queries';
import {
  ADD_WORDLIST,
  ADD_GAME,
  ADD_TEAMCAT,
  ADD_TEAMDOG,
  UPDATE_GAME
} from '../utils/mutations';


export const Home = () => {
  const [value, setValue] = React.useState(0);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [queryWords, { loading, error, data }] = useLazyQuery(QUERY_WORDS);
  const [addGame, { gameData }] = useMutation(ADD_GAME);
  const [addWordList, { wordListErr }] = useMutation(ADD_WORDLIST);
  const [addTeamCat, { tcErr }] = useMutation(ADD_TEAMCAT);
  const [addTeamDog, { tdErr }] = useMutation(ADD_TEAMDOG);
  const [updateGame, { updateGameErr }] = useMutation(UPDATE_GAME);

  const startGame = async () => {
    let words = [];
    let wordIds = [];
    let gameId = "";
    let gameName = "";
    let wordListId = "";
    let teamCatId = "";
    let teamDogId = "";

    try {
      const { data } = await queryWords();
      // console.log(data);
      words = data?.words.map((entry) => entry.name.toUpperCase()) || [];
      wordIds = data?.words.map((entry) => entry._id) || [];
    } catch (err) {
      console.error(err);
    }

    try {
      let firstThreeWords = words.slice(0, 3);
      // console.log(words);
      gameName = firstThreeWords.join('-').toLowerCase();

      // console.log(gameName);

      const { data } = await addGame({ variables: { name: gameName } });
      gameId = data.addGame._id;
      // console.log(gameId);
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await addWordList({ variables: { wordIds: wordIds } });
      wordListId = data.addWordList._id;
      // console.log(data.addWordList)
      const catWordsIndex = data.addWordList.catWords.map(catWord => wordIds.indexOf(catWord._id))
      // console.log(catWordsIndex)
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await addTeamCat({ variables: { gameId } });
      teamCatId = data.addTeamCat._id;
      console.log(teamCatId);
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await addTeamDog({ variables: { gameId } });
      teamDogId = data.addTeamDog._id;
      console.log(teamDogId);
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await updateGame({
        variables:
        {
          gameId,
          teamCatId,
          teamDogId,
          wordListId,
        }
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    window.location.replace(`/game/${gameName}`);
  }

  return (
    <div>
      <Grid container justifyContent="end">
        <Grid item>
          <Stack spacing={2} direction="row" centered>
            <Box sx={{ width: 500 }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction
                  onClick={startGame}
                  label="game"
                  icon={<GameIcon />}
                />
                <BottomNavigationAction label="logout" icon={<LogoutIcon />} onClick={logout} />
              </BottomNavigation>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
