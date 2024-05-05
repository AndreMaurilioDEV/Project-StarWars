import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResultApi, ResultApiURL } from "../../api/typeApi";
import { apiPlanets, apiUniquePlanet, apiPlanetFilms, apiPlanetsResidents } from "../../api";
import './planetDetail.css';
import { IoPeopleSharp } from "react-icons/io5";
import { MdScreenRotationAlt } from "react-icons/md";
import { GiOrbital } from "react-icons/gi";
import { CgTerrain } from "react-icons/cg";
import { RiRecordCircleLine } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSkyatlas } from "react-icons/fa";
import { FaWeightHanging } from "react-icons/fa";
import { imgPlanets, ImgType } from "../table/ImgPlanets";
import 'ldrs/tailChase';
import { tailChase } from 'ldrs'
tailChase.register()

type Film = {
    characters: string[];
    created: string;
    director: string;
    edited: string;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];
  };

  type Resident = {
    name: string;
  };

function PlanetDetails () {
    const { name } = useParams();
    const [infoPlanets, setInfoPlanets] = useState<ResultApi[]>([]);
    const [planetDetails, setPlanetDetails] = useState<ResultApiURL>();
    const [planetFilms, setPlanetsFilms] = useState<Film[]>([]);
    const [images, setImages] = useState<ImgType[]>([]);
    const [loading, setLoading] = useState(true);
    const [residentsDetails, setResidentsDetails] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlanets = async () => {
          try {
            const planets = await apiPlanets();
            setInfoPlanets(planets);
          } catch (error) {
            console.log(error);
          }
        };
    
        const fetchPlanetDetails = async () => {
          if (name) {
            const namePlanets = infoPlanets.filter((info) => info.name.includes(name));
            const planetUrl = namePlanets.length > 0 ? namePlanets[0].url : null;
            if (planetUrl) {
              try {
                const planets = await apiUniquePlanet(planetUrl);
                setPlanetDetails(planets);
              } catch (error) {
                console.error(error);
              }
            }
          }
        };

        const fetchPlanetsFilms = async () => {
            if (name) {
                const namePlanets = infoPlanets.filter((info) => info.name.includes(name));
                const planetUrl = namePlanets.length > 0 ? namePlanets[0].films : null;
                if (planetUrl) {
                  try {
                    const planetsFilmsData = await Promise.all(
                        planetUrl.map(async (filmUrl) => {
                          const planets = await apiPlanetFilms(filmUrl);
                          return planets;
                        }) 
                    );
                    setPlanetsFilms(planetsFilmsData);
                  } catch (error) {
                    console.error(error);
                  }
                }
              }
        }

        const setImgPlanets = () => {
          if (name) {
            const planet = imgPlanets.find((item) => item.name.includes(name));
        
            if (planet) {
              setImages(() => [
                { name: planet.name, imgSrc: planet.imgSrc.toString() },
              ]);
            }
          }
        };

        const fecthResidents = async () => {
          if (planetDetails) {
            try {
              const allResidents = planetDetails.residents;
             const residents = allResidents.map(async (info) => {
                const residentsData = await apiPlanetsResidents(info);
                return residentsData;
              })
              const residentsDetailsPromise = await Promise.all(residents);
              setResidentsDetails(residentsDetailsPromise);
            } catch (error) {
            }
          }
        }
    
        Promise.all([fetchPlanets(), fetchPlanetDetails(), 
          fetchPlanetsFilms(), setImgPlanets(), fecthResidents()]).then(() => {
          setLoading(false);
        });

      }, [name, infoPlanets]);

      //if (loading) return <div className="loading">Loading Planet...</div>;

    return (
        <>
        {!loading ? (
        <p className="navigate-home">
          <FaArrowLeftLong className= 'icon-back'color="white" onClick={() => navigate('/planets')} /> Voltar para Planets
        </p>
        ) : (
          <div className="ball-loading-planets">
            <div>
            <l-tail-chase
            size="40"
            speed="1.2"
            color="white" 
            ></l-tail-chase>
            </div>
          </div>
        )}
        <section>
            {planetDetails &&
            <div style={{paddingBottom: 50}}>
            <div className="div-Img-Planet">
            <div className="img-container">
              {images.map((item) => 
              <img src={item.imgSrc} alt={item.name} />
              )}
            </div>
            </div>
            <h2 className="title-planet">{planetDetails.name}</h2>
            <h2 className="title">Principal Informations</h2>
            <p><IoPeopleSharp className='icons-Details'/>Population: {planetDetails.population}</p>
            <p><RiRecordCircleLine className="icons-Details"/> Diameter: {planetDetails.diameter}</p>
            <p><FaSkyatlas className="icons-Details"/> Climate: {planetDetails.climate}</p>
            <p><FaWeightHanging className="icons-Details"/> Gravity: {planetDetails.gravity}</p>
            <p><CgTerrain className="icons-Details"/> Terrain: {planetDetails.terrain}</p>
            <p><GiOrbital className="icons-Details" /> Orbital P: {planetDetails.orbital_period}</p>
            <p><MdScreenRotationAlt className="icons-Details"/> Rotation: {planetDetails.rotation_period}</p>
            <h2 className="title">Films</h2>
            {planetFilms.map((info) => 
            <div className="card-Film">
            <h3 className="title-Film">{info.title}</h3>
            <p className="desc-Film">{info.opening_crawl}</p>
            <p>{info.director}</p>
            <p>{info.producer}</p>
            <p>{info.release_date}</p>
            </div>
            )}
            
            </div>
            }
        </section>
        </>
    )
};

export default PlanetDetails;