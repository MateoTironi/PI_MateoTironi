import React from "react";
import img from '../img/loadingpk.gif'

export const Loading = ()=>{
    return(
        <div>
            <img src={img} alt='Loading'/>
            <h3>Cargando...</h3>
        </div>
    )
}