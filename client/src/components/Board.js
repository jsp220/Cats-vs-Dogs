import React from "react";

import Card from "./Card";

function Board(props) {
    function renderCard(i) {

        // Clear word with card has been flipped. (BZ)
        if (props.cardFlipped[i]) props.cardWords[i] = "";

        return (
            <Card
                backgroundImage={i} // Added for card image. (BZ)
                word={props.cardWords[i].toUpperCase()}
                cardClass={props.cardClass[i]}
                bgImg={props.bgImgs[i]}
                onClick={() => props.onClick(i)}
                className="card-body"
            />
        );
    }

    function renderColumns(rowPosition) {
        const columns = [];
        for (let columnPosition = 0; columnPosition < 5; columnPosition++) {
            columns.push(renderCard(columnPosition + rowPosition * 5));
        }
        return columns;
    }

    function renderRows() {
        const rows = [];
        for (let rowPosition = 0; rowPosition < 5; rowPosition++) {
            rows.push(
                <div className="board-row" key={rowPosition}>{renderColumns(rowPosition)}</div>
            );
        }
        return rows;
    }

    return (
        <div className="col-12 col-lg-6 col-xl-5 ">
            {renderRows()}
        </div>
    );
}

export default Board;