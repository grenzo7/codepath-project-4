import React from "react";

const Ban = (props) => {
    const {fullNames, heights, weights, lifeSpans} = props.banData; 
    return(
      <div className="ban-container">
        <h3>Banned</h3>
        <div className="ban-container-content">
            <h5>Dog Names</h5>
            {fullNames && fullNames.map((name) => <span>{name}</span>)}
        </div>
        <div className="ban-container-content">
            <h5>Heights</h5>
            {heights && heights.map((height) => <span>{height} m</span>)}
        </div>
        <div className="ban-container-content">
            <h5>Weights</h5>
            {weights && weights.map((weight) => <span>{weight} kg</span>)}
        </div>
        <div className="ban-container-content">
            <h5>Life Span</h5>
            {lifeSpans && lifeSpans.map((lifeSpan) => <span>{lifeSpan}</span>)}
        </div>
      </div>

    )
}

export default Ban;