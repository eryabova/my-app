import React from "react";
import { PhotoItem } from "./PhotoItem";

export const PhotoList = (props) => {
    const { data, listType = "list" } = props;

    return (
       <div className={`photo-list ${data ? `photo-list_${listType}` : ""}`}>
        {data && Object.values(data).length ? 
                data?.map((photoItem) => {
                    return <PhotoItem {...photoItem} key={photoItem.id}/>
                })
            : <p>Ничего не найдено</p>
        }
       </div>
    )
};