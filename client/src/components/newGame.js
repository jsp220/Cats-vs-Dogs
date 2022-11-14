import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_WORDS } from "../utils/queries";
import GameIcon from "@mui/icons-material/SportsEsports";
import {
  ADD_WORDLIST,
  ADD_GAME,
  ADD_TEAMCAT,
  ADD_TEAMDOG,
  UPDATE_GAME,
} from "../utils/mutations";

export const NewGame = () => {
  const [queryWords] = useLazyQuery(QUERY_WORDS);
  const [addGame] = useMutation(ADD_GAME);
  const [addWordList] = useMutation(ADD_WORDLIST);
  const [addTeamCat] = useMutation(ADD_TEAMCAT);
  const [addTeamDog] = useMutation(ADD_TEAMDOG);
  const [updateGame] = useMutation(UPDATE_GAME);
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
      gameName = firstThreeWords.join("-").toLowerCase();

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
        variables: {
          gameId,
          teamCatId,
          teamDogId,
          wordListId,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    window.location.replace(`/game/${gameName}`);
  };

  return (
    <div className="col-12 col-md-6 m-1">
        <Card className="create-game" onClick={startGame} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Create a new game
            </Typography>
            <Typography component="div">
              <BottomNavigationAction
                onClick={startGame}
                label="game"
                icon={<GameIcon sx={{ fontSize: 100 }} />}
              />
            </Typography>
          </CardContent>
        </Card>
    </div>
  );
};

export default NewGame;
