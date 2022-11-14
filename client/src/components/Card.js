import React from "react";

import { zoomIn } from "react-animations";
import "animate.css";
import styled, { keyframes } from "styled-components";

const ZoomIn = styled.div`
  animation: 2s ${keyframes`${zoomIn}`};
`;

function Card(props) {

    /* Added card Images. (BZ) */
    let idx = props.backgroundImage;
    let image = null;

    if (!props.word) {
        image = props.bgImg;
    } else
        image = "";

    return (
        <ZoomIn>
            <h4>
                <button style={
                    {
                        backgroundImage: `url(${image})`,
                        backgroundSize: "100% 100%"
                    }}
                    className={props.cardClass}
                    onClick={props.onClick}>
                    {props.word}
                </button>
            </h4>
        </ZoomIn>
    );
}

export default Card;