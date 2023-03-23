import React from "react";

const Watched = ({images}) =>{
    return(<div className="left-panel" >
        <h2>You have watched the following!!!</h2>
        <div>
        {images && images.length > 0 ? (
            images.map((pic, index) => (
            <div className="gallery" key={index}>
                <img
                className="gallery-screenshot"
                src={pic.url}
                alt="Undefined screenshot from query"
                width="300"
                />
                <br></br>
                <span>A dog with weight {pic.breeds[0].weight.metric} kg and lifespan {pic.breeds[0].life_span}.</span>
            </div>
            )


            )
        ) : (
            <div>
            <h3>That's it!</h3>
            </div>
        )}
        </div>
    </div>)

}

export default Watched;