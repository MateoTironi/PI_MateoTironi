import React from "react";
import '../styles/Landing.css';
import { NavLink } from "react-router-dom"
// import img1 from '../img/img1lp.jpeg'
// import img2 from '../img/img2lp.jpg'
// import img3 from '../img/img3lp.png'
// import img4 from '../img/img4lp.jpg'

export default function Landing() {

    return (
        <div className="header">




            <div className="header-cont">
                <h1 className="degradado">Bienvenido a una nueva aventura</h1>
                <p className="p">Aqui podras ver las estadisticas de tus personajes favoritos y ademas podras crear el pokemon de tus sueños</p>
                <NavLink to="/n/home" className={'btn'}>
                    <span id="span1"></span>
                    <span id="span2"></span>
                    <span id="span3"></span>
                    <span id="span4"></span>
                    ingresar
                </NavLink>
            </div>
        </div>
    )


}




{/* <div className="slider">
    <ul>
        <li><img src={img1} alt="" /></li>
        <li><img src={img2} alt="" /></li>
        <li><img src={img3} alt="" /></li>
        <li><img src={img4} alt="" /></li>
    </ul>
</div> */}
