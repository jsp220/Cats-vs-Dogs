import React from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import GameIcon from "@mui/icons-material/SportsEsports";
import Auth from "../utils/auth";
import { useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_WORDS } from "../utils/queries";
import {
  ADD_WORDLIST,
  ADD_GAME,
  ADD_TEAMCAT,
  ADD_TEAMDOG,
  UPDATE_GAME
} from '../utils/mutations';
import {browserHistory} from "react-router";


export const Home = () => {
  const [value, setValue] = React.useState(0);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // just added
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [queryWords] = useLazyQuery(QUERY_WORDS);
  const [addGame] = useMutation(ADD_GAME);
  const [addWordList] = useMutation(ADD_WORDLIST);
  const [addTeamCat] = useMutation(ADD_TEAMCAT);
  const [addTeamDog] = useMutation(ADD_TEAMDOG);
  const [updateGame] = useMutation(UPDATE_GAME);
  // to here

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
    // browserHistory.push(`/game/${gameName}`);
  };

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
                <BottomNavigationAction
                  label="logout"
                  icon={<LogoutIcon />}
                  onClick={logout}
                />
              </BottomNavigation>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <div className="rulesBox">
        <Box sx={{ height: 300 }}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show Rules"
          />
          <Box
            sx={{
              "& > :not(style)": {
                display: "flex",
                justifyContent: "space-around",
                height: 120,
                width: 500,
              },
            }}
          >
            <div className="rulesCard">
              <Collapse in={checked} >
                <h1 className="rulesTitle">Rules</h1>
                <p>Codenames is a party game that you have to work to figure out the secret identities of all their agents via their codenames.</p>
                <p>The games starts with 25 codenames lined up in a 5 x 5 grid in the center of the table, and everyone divided up into 2 teams.</p>
                <p>Each team picks a spymaster and the spymasters set up on the opposite side of everyone else with an answer key card in front of them. This card identifies which codenames line up with which field agents.</p>
                <p>The spymaster must give a one word clue to help identify an agent(s) in the field (on the table) along with a number, which corresponds to the number of agents. Ideally they will be connecting 2 or more agents via the clue and their codename</p>
                <p>For example they will say things like:</p>
                <p>“Elements: 2”</p>
                <p>“Animals: 3”</p>
                <p>You and your team must then decide on which codenames the spymaster is trying to connect. Once you decide you touch the codename and the spymaster puts an agent/bystander/assassin (blue and red/beige/black respectively) onto the clue.</p>
                <p>Whoever contacts (i.e. correctly guesses) all their field agents’ first, wins!</p>
                <p>If you guess incorrectly, your team’s turn is over. If you guess the dreaded assassin (see picture below), you lose!</p>
                <p>You must guess at least once, and you can have an extra guess (above the given number) if you want to try to get a previous clue you messed up on.</p>
                <p>Spymasters must not communicate in any way other than a clue and a number.</p>
                <p></p>
                <p></p>
                <p></p>


              </Collapse>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Home;
