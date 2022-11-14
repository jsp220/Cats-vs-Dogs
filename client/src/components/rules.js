import React from 'react'
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";


export const Rules = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div>
      <div className="rulesBox">
        <Box>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show Rules"
          />
          <Box
            sx={{
              "& > :not(style)": {
                display: "flex",
                justifyContent: "space-around",
                zIndex: 1,
                height: 120,
                // width: 500,
              },
            }} className="m-1"
          >
            <div className="rulesCard">
              <Collapse in={checked}>
                <div className='p-2'>
                  <h1 className="rulesTitle">Rules</h1>
                  <p>
                    Codenames is a party game that you have to work to figure out
                    the secret identities of all their agents via their codenames.
                  </p>
                  <p>
                    The games starts with 25 codenames lined up in a 5 x 5 grid in
                    the center of the table, and everyone divided up into 2 teams.
                  </p>
                  <p>
                    Each team picks a spymaster and the spymasters set up on the
                    opposite side of everyone else with an answer key card in
                    front of them. This card identifies which codenames line up
                    with which field agents.
                  </p>
                  <p>
                    The spymaster must give a one word clue to help identify an
                    agent(s) in the field (on the table) along with a number,
                    which corresponds to the number of agents. Ideally they will
                    be connecting 2 or more agents via the clue and their codename
                  </p>
                  <p>For example they will say things like:</p>
                  <p>“Elements: 2”</p>
                  <p>“Animals: 3”</p>
                  <p>
                    You and your team must then decide on which codenames the
                    spymaster is trying to connect. Once you decide you touch the
                    codename and the spymaster puts an agent/bystander/assassin
                    (blue and red/beige/black respectively) onto the clue.
                  </p>
                  <p>
                    Whoever contacts (i.e. correctly guesses) all their field
                    agents’ first, wins!
                  </p>
                  <p>
                    If you guess incorrectly, your team’s turn is over. If you
                    guess the dreaded assassin (see picture below), you lose!
                  </p>
                  <p>
                    You must guess at least once, and you can have an extra guess
                    (above the given number) if you want to try to get a previous
                    clue you messed up on.
                  </p>
                  <p>
                    Spymasters must not communicate in any way other than a clue
                    and a number.
                  </p>
                  <p></p>
                </div>
              </Collapse>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default Rules;