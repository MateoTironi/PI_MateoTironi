import React, { useState } from "react"
import { Link } from "react-router-dom";
import '../styles/NavBar.css'
import img from '../img/search.png'

export default function NavBar() {
    let [input, setInput] = useState({
        search: ''
    })

    let handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    let handleClick = (e) => {
        e.preventDefault()
        setInput({
            search: ''
        })
    }

    return (
        <div className="serch-bar">
            {/* <h2>NavBar</h2> */}
            <input type='search' placeholder="Buscar..." name='search' value={input.search} onChange={e => handleChange(e)} />
            <Link to={`/n/detail/${false}?name=${input.search}`}>
            {input.search ?<button type='submit' value={'Search'} onBlur={e => handleClick(e)}><img src={img} alt='lupa'/></button> : null} 
            </Link>
        </div>
    )

}