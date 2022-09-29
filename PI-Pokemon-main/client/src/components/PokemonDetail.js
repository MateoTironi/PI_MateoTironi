import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { cleanState, getPokemonById, getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import '../styles/Details.css'

export default function PokemonDetail(props) {
    let { id } = props.match.params;
    let name = props.location.search.toString().split('=')[1]
    let dispatch = useDispatch();
    let [input, setInput] = useState('')

    useEffect(e => {
        dispatch(cleanState())
        if (name) {
            dispatch(getPokemons(name))
        } else {
            dispatch(getPokemonById(id))
        }
    }, [dispatch, id])

    let details = useSelector(state => state.details)

    let handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    let handleClick = (e) => {
        e.preventDefault()
        dispatch(getPokemons(input))
        setInput('')
    }

    return (
        <div>
            {details ? details.map(e => {
                let type = e.types ? e.types.map(e => {
                    if (e.name) return e.name
                    else return e;
                }) : null
                return (
                    <div className='detail'>
                        <div>
                            <Link to={'/n/home'}><button>Back</button></Link>
                            <h1>{e.name}</h1>
                            <div id='compare'>
                                <input type={'search'} placeholder='Busca un pokemon para comparar' onChange={e => handleChange(e)} />
                            </div>
                            {input ? <button type='submit' id='btn' onClick={e => handleClick(e)}>Compare</button> : null}
                        </div>
                        <img src={e.img} alt={`Imagen de ${e.name}`} />
                        <ul>
                            <li>ID: {e.id}</li>
                            <li>HP: {e.life}</li>
                            <li>Attack: {e.attack}</li>
                            <li>Defense: {e.defense}</li>
                            <li>Speed: {e.speed}</li>
                            <li>Weight: {e.weight}</li>
                            <li>Height: {e.height}</li>
                            <li>Type: {`${type}`}</li>

                        </ul>
                    </div>

                )
            }) : null}
        </div>
    )

}
