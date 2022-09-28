import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deletePokemon } from "../actions";

export default function Card({e}){
    let dispatch = useDispatch()

    const handelClick = (e) =>{
        dispatch(deletePokemon(e.target.value))
    }

    return (
        <div key={e.name} className='card-container'>
            {e.createdInDb ? <button value={e.id} onClick={e => handelClick(e)}>X</button> : null}
            <NavLink to={`/n/detail/${e.name}`} className='link'>
                <h3 key={e.name}>{e.name}</h3>
                <img src={`${e.img}`} alt='Imagen del pokemon' className="pokemon__img" />
                <p>Type: {e.type.toString()}</p>

            </NavLink>
        </div>
    )
}