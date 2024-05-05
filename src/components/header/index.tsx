import { useNavigate } from "react-router-dom";
import './header.css'
import { RiHome4Line } from "react-icons/ri";
import { IoPlanetSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import starWarsLogo from '../../assets/Star_Wars_Logo.svg-removebg-preview.webp';

function Header () {
    const navigate = useNavigate();
    return (
        <>
        <header className="header-flex">
            <div className="nav-Flex">
                <img src={starWarsLogo} alt="Star Wars Logo"/>
            <nav className="nav-menu">
            <ul className="nav_list">
            <li className="nav_item" onClick={
                () => { navigate('/') }
            }>
            <span><IoMdHome className="icon-button"/></span>
            <p>Home</p>
            </li>  
            </ul>
            <ul className="nav_list">
            <li className="nav_item" onClick={
                () => { navigate('/planets ')}
            }>
            <span><IoPlanetSharp className="icon-button"/></span>
            <p>Planets</p>
            </li>  
            </ul>
            <ul className="nav_list">
            <li className="nav_item">
            <span><IoMdInformationCircle className="icon-button"/></span>
            <p>About</p>
            </li>  
            </ul>
            </nav>    
            </div>
        </header>
        </>
    )
};

export default Header;