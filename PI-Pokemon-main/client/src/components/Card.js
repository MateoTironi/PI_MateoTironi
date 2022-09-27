import React from "react";
import { NavLink } from "react-router-dom";

export default function Card({e}){
    return (
        <div key={e.name} className='card-container'>
            <NavLink to={`/n/detail/${e.name}`} className='link'>
                <h3 key={e.name}>{e.name}</h3>
                <img src={`${e.img}`} alt='Imagen del pokemon' className="pokemon__img" />
                <p>Type: {e.type.toString()}</p>

            </NavLink>
        </div>
    )
}