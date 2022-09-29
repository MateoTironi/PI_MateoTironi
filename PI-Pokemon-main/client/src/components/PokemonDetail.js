import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { cleanState, getPokemonById, getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import '../styles/Details.css'

export default function PokemonDetail(props) {
    let { id } = props.match.params;
    let name = props.location.search.toString().split('=')[1]

    let dispatch = useDispatch();
    useEffect(e => {
        dispatch(cleanState())
        if (name) {
            dispatch(getPokemons(name))
        } else {
            dispatch(getPokemonById(id))
        }
    }, [dispatch, id])

    let details = useSelector(state => state.details)
    let type = details.types ? details.types.map(e => {
        if (e.name) return e.name
        else return e;
    }) : null

    return (
        <div className='detail'>
            <div>
                <Link to={'/n/home'}><button>Back</button></Link>
                <h1>{details.name}</h1>
            </div>
            <img src={details.img} alt={`Imagen de ${details.name}`} />
            <ul>
                <li>ID: {details.id}</li>
                <li>HP: {details.life}</li>
                <li>Attack: {details.attack}</li>
                <li>Defense: {details.defense}</li>
                <li>Speed: {details.speed}</li>
                <li>Weight: {details.weight}</li>
                <li>Height: {details.height}</li>
                <li>Type: {`${type}`}</li>

            </ul>
        </div>
    )

}

// function mapStateToProps(state){
//     return{
//         details: state.details
//     }
// }

// export default connect(mapStateToProps)(PokemonDetail)