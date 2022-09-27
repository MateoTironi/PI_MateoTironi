import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { createPokemon } from "../actions";
import { Link } from "react-router-dom"
import '../styles/CreatePokemon.css'

export default function CreatePokemon() {
    let [form, setForm] = useState({
        name: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        type: '',
        img: '',
    });
    let [err, setErr] = useState({});
    let dispatch = useDispatch()

    function validateText(e) {
        if (!e.target.value.trim()) setErr({ ...err, [e.target.name]: `Falta completar ${e.target.name}` })
        if (/\d/.test(e.target.value)) setErr({ ...err, [e.target.name]: `${e.target.name} solo puede contener letras` });
        else setErr({ ...err, [e.target.name]: null })
    }

    function validateNumber(e) {

        if (/[A-z]/.test(e.target.value)) setErr({ ...err, [e.target.name]: `${e.target.name} solo puede contener numeros` });
        else setErr({ ...err, [e.target.name]: null })
    }

    let validateSubmit = () => {
        let validate = false
        let formValues = Object.values(form);
        if (formValues.includes('')) validate = true;

        for (const e in err) {
            if (err[e]) validate = true
        }

        return validate;
    }

    let handleBlur = (e) => {
        if (!e.target.value.trim()) setErr({ ...err, [e.target.name]: `Falta completar ${e.target.name}` })
    }

    let handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'name' || e.target.name === 'type') validateText(e);
        else if (e.target.name !== 'img') validateNumber(e);

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        dispatch(createPokemon(form));

        setForm({
            name: '',
            life: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            type: '',
            img: '',
        });
        alert('Pokemon creado!!')
    }

    return (
        <div className="card">
            <div className="title-cr">
                <Link to={'/n/home'}><button>back</button></Link>
                <h1>Crea el pokemon de tus sueños</h1>
            </div>

            <form onSubmit={e => handleSubmit(e)} className='form'>
                <div>
                    <h4>Name: </h4>
                    <input type={'text'} name={'name'} value={form.name} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.name && <p className="danger">{err.name}</p>}
                </div>
                <div>
                    <h4>Life: </h4>
                    <input type={'text'} name={'life'} value={form.life} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.life && <p className="danger">{err.life}</p>}
                </div>
                <div>
                    <h4>Attack: </h4>
                    <input type={'text'} name={'attack'} value={form.attack} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.attack && <p className="danger">{err.attack}</p>}
                </div>
                <div>
                    <h4>Defense: </h4>
                    <input type={'text'} name={'defense'} value={form.defense} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.defense && <p className="danger">{err.defense}</p>}
                </div>
                <div>
                    <h4>Speed: </h4>
                    <input type={'text'} name={'speed'} value={form.speed} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.speed && <p className="danger">{err.speed}</p>}
                </div>
                <div>
                    <h4>Height: </h4>
                    <input type={'text'} name={'height'} value={form.height} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.height && <p className="danger">{err.height}</p>}
                </div>
                <div>
                    <h4>Weight: </h4>
                    <input type={'text'} name={'weight'} value={form.weight} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.weight && <p className="danger">{err.weight}</p>}
                </div>
                <div>
                    <h4>Type: </h4>
                    <input type={'text'} name={'type'} value={form.type} onBlur={e => handleBlur(e)} onChange={e => handleChange(e)} />
                    {err.type && <p className="danger">{err.type}</p>}
                </div>
                <div>
                    <h4>Img: </h4>
                    <input type={'url'} name={'img'} placeholder='Url de la img' value={form.img} onChange={e => handleChange(e)} />
                    {err.img && <p className="danger">{err.img}</p>}
                </div>
                <div>
                {validateSubmit() ? <h5>Debes completar el formulario correctamente</h5> : <input className="submit" type={'submit'} />}
                </div>
            </form>
        </div>
    )

}