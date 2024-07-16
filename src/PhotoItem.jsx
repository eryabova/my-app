import React from "react";

export const PhotoItem = ({ alt_description, links = {}}) => {

    return (
       <figure className="photo-item">
            <img src={links.download} alt={alt_description}/>
            <figcaption className="photo-item_info">{alt_description}</figcaption>
       </figure>
    )
};