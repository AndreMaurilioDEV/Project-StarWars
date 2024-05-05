import { useNavigate } from "react-router-dom";
import './initial.css';
import bgImage from '../../assets/Star_Wars_Logo.svg-removebg-preview.webp';

function InitialPage () {
    const navigate = useNavigate();
    return (
        <>
        <div className="div-logo">
        <div className="flex-logo">
        <img src={bgImage} alt="Star Wars Logo" />
        </div>
        </div>
        <div className="div-Flex-Btn">
        <button
        onClick={() => {
            navigate('/planets')
        }}
        className="btn-Initial"
        >
            Explore Planets
        </button>
        </div>
        
        </>
    )
};

export default InitialPage;