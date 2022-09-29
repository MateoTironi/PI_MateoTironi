import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFilter, cleanState, filterByOrigin, filterByType, getPokemons, getTypes, orderByName } from "../actions";
import { Link } from "react-router-dom"
import '../styles/Filter.css'
import '../styles/Home.css'
import Card from "./Card";

export default function Home() {
    let dispatch = useDispatch()
    let [currentPage, setCurrentPage] = useState(0);
    let [page, setPage] = useState(1);
    let [render, setRender] = useState('');

    useEffect(e => {
        dispatch(cleanState())
        dispatch(getPokemons())
        dispatch(getTypes());
    }, [dispatch]);

    let types = useSelector((state) => state.types);
    let pokemons = useSelector(state => state.pokemons)
    const cantPages = Math.ceil(pokemons.length / 12)

    const listPokemons = () => {
        if(pokemons.length === 1 ) return pokemons
        return pokemons.slice(currentPage, currentPage + 12)
    }

    const handleFilterByType = (e) => {
        setCurrentPage(0)
        setPage(1)
        dispatch(actFilter(e))
        dispatch(filterByType())
    }

    const pages = (e, boolean) => {
        setCurrentPage((e.target.value * 12) - 12)
        if (boolean === 'true') setPage(page + 1);
        if (boolean === 'false') setPage(page - 1);
        if (boolean === 'left') setPage(1)
        if (boolean === 'right') setPage(cantPages)
    }

    const numberPages = () => {
        return (
            <div key={page} className='paginado'>

                {page > 2 ? <button value={1} onClick={(e) => pages(e, 'left')}>1</button> : null}
                {page > 2 ? <button>...</button> : null}
                {page === 1 ? null : <button value={page - 1} onClick={e => pages(e, 'false')} key={page - 1}>{page - 1}</button>}
                <button value={page} onClick={e => pages(e)} key={page}>{page}</button>
                {page === cantPages ? null : <button value={page + 1} onClick={e => pages(e, 'true')} key={page + 1}>{page + 1}</button>}
                {page < cantPages - 1 ? <button>...</button> : null}
                {page < cantPages - 1 ? <button value={cantPages} onClick={(e) => pages(e, 'right')}>{cantPages}</button> : null}
            </div>
        )
    }

    const handelOrderByName = (e) => {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(0)
        setPage(1)
        setRender(`Ordenado por ${e.target.value}`)
    }

    const pokemonsCreated = (e) => {
        dispatch(filterByOrigin(e))
    }

    const renderFiltros = () => {
        return (
            <div key={'filtros'} className='filtros'>
                <h3 className="title">Filters:</h3>
                <h4 className="h4" key={'filtros<li>'}>By Type:</h4>
                <div key={'filtros<ul>'} className='by-type'>
                    {types[0] ? types[0].map(e => {

                        return (
                            <div className="checkbox">
                                <input type={'checkbox'} checked={null} id={e} value={e} onChange={e => handleFilterByType(e)}/>
                                <p for={e} key={e}>{e}</p>
                            </div>
                        )
                    }) : null}
                </div>
                <div className="by-origin">By Origin:
                    <div>
                        <input key={'all'} type={'radio'} name="origin" value={'all'} onClick={e => pokemonsCreated(e)} />
                        <label>All</label>
                    </div>
                    <div>
                        <input key={'createdInDb'} type={'radio'} name="origin" value={'createdInDb'} onClick={e => pokemonsCreated(e)} />
                        <label>Created</label>
                    </div>
                    <div>
                        <input key={'originals'} type={'radio'} name="origin" value={'originals'} onClick={e => pokemonsCreated(e)} />
                        <label>originals</label>
                    </div>
                </div>
                <select onChange={e => handelOrderByName(e)} className='by-order'>
                    <option value={'all'}>By Order:</option>
                    <option value={'ascending'}>Alphabetically Ascending</option>
                    <option value={'decendent'}>Alphabetically Decendent</option>
                    <option value={'attack'}>Attack</option>
                </select>
                <footer className="btn-add">
                    <Link to={'/n/create'}>
                        <button key={'addButton'}>+</button>
                    </Link>
                </footer>
            </div>)
    }
    
    return (
        <div key={'Home'} className='body'>
            <div key={'Filters'}>

                {
                    renderFiltros()
                }
            </div>

            <div className="lists__pokemons">
                {listPokemons().length !== 0 ? listPokemons().map(e => {
                    
                    return (
                        <Card e={e} />
                    )
                }) : <h4>No hay pokemons con estas caracteristicas..</h4>}
            </div>
            {
                listPokemons().length !== 0 ? numberPages() : null
            }
        </div>
    )

}
