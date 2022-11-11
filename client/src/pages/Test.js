import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useLazyQuery } from '@apollo/client';
import { QUERY_WORDS } from '../utils/queries';
import { ADD_WORDLIST, ADD_GAME, UPDATE_GAME } from '../utils/mutations';

// const Game = () => {
//     const {loading, err, data } = useQuery(QUERY_WORDS)
//     const [addWordList, { error }] = useMutation(ADD_WORDLIST);
    
//     if (loading) return null;
//     if (err) return null;

//     const words = data?.words.map((entry) => entry.name.toUpperCase()) || [];
//     const wordIds = data?.words.map((entry) => entry._id) || [];

//     // console.log(data, "abc");
//     if (wordIds.length !== 0) {
//         console.log(wordIds);
//         addWordList({variables: wordIds })
//             .then((data) => console.log(data))
//             .catch((err) => {
//             console.error(err);
//         })

//         return <div>hi</div>
//     }

//     ;
// }

const Test = () => {
    // const [gameStart, setGameStart] = useState(false);

    const [queryWords, { loading, error, data }] = useLazyQuery(QUERY_WORDS);
    const [addGame, { gameData }] = useMutation(ADD_GAME);
    const [addWordList, { err }] = useMutation(ADD_WORDLIST);
    const [updateGame, { updateGameErr }] = useMutation(UPDATE_GAME);

    const startGame = async () => {
        let words = [];
        let wordIds = [];
        let gameId = "";
        let wordListId = "";

        try {
            const {data} = await queryWords();
            // console.log(data);
            words = data?.words.map((entry) => entry.name.toUpperCase()) || [];
            wordIds = data?.words.map((entry) => entry._id) || [];
        } catch (err) {
            console.error(err);
        }

        try {
            let firstThreeWords = words.slice(0, 3);
            // console.log(words);
            const gameName = firstThreeWords.join('-').toLowerCase();

            // console.log(gameName);
            
            const {data} = await addGame({variables: { name: gameName }});
            console.log(data.addGame);
            gameId = data?.addGame._id;
        } catch (err) {
            console.error(err);
        }


        try {
            const {data} = await addWordList({variables: {wordIds: wordIds} });
            wordListId = data.addWordList._id;
        } catch (err) {
            console.error(err);
        }

        try {
            const {data} = await updateGame({variables: 
                    {
                        gameId: gameId,
                        wordListId: wordListId
                    }
                });
            console.log(data);
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <main>
            <div>
                {/* <button onClick={() => setGameStart(true)}>Start Game</button> */}
                <button onClick={startGame}>Start Game</button>

            </div>
            {/* {gameStart 
                ? <Game />
                : null
            } */}
        </main>
    );
};

export default Test;
