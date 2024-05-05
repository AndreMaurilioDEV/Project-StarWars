import { useContext, useEffect, useState } from 'react';
import { apiPlanets } from '../../api';
import themeContext from '../../theme/themeContext';
import { ResultApi, ResultApiURL } from '../../api/typeApi';
import { comparasionMath, columnFilter,
  initialFilter, Filter, initialNumerics } from './comparasionFun';
import { useFilters } from '../../hooks/useFilter';
import FilterPlanets from '../filterPlanets';
import { Link } from 'react-router-dom';
import './planets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, AccordionHeader, AccordionBody } from 'react-bootstrap';
import { IoFilterSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { imgPlanets, ImgType } from './ImgPlanets';
import { tailChase } from 'ldrs';
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

tailChase.register()

function Table() {
  const [columnFilterState, setColumnFilterState] = useState<string[]>(columnFilter);
  const [infoPlanets, setInfoPlanets] = useState<ResultApi[]>([]);
  const [filters, setFilter] = useState(initialFilter);
  const [originalData, setOriginalData] = useState([]);
  const [lastFilter, setLastFilter] = useState<ResultApi[]>([]);
  const filHook = useFilters();
  const [errorBoolean, setErrorBoolean] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [planetDetails, setPlanetDetails] = useState<ResultApiURL[]>([]);
  const [imgPlanetSrc, setImgPlanetSrc] = useState<ImgType[]>([])
  const [loading, setLoading] = useState(false);
  
  const fetch = async () => {
    try {
      setLoading(true);
      const planets = await apiPlanets();
      setInfoPlanets(planets);
      setOriginalData(planets);
    } catch (error) {
      setErrorBoolean(true);
    } finally {
      setLoading(false);
    }
  };


  const theme = useContext(themeContext);
  //const tableHeaders = infoPlanets.length > 0 ? Object.keys(infoPlanets[0]) : [];

  const handleButtonFilter = () => {
    setInfoPlanets([]);
    const columnPlanet = theme.filters.filterNumerics.column as keyof ResultApi;
    const { column, comparasion, value } = theme.filters.filterNumerics;
    const filtered = infoPlanets.filter((info) => {
      const columnValue = parseFloat(info[columnPlanet] as string);
      if (Number.isNaN(columnValue)) {
        return false;
      }
      return comparasionMath(comparasion, value, columnValue);
    });
    setInfoPlanets(filtered);
    const newFilter = {
      column,
      comparasion,
      valueNumber: value,
    };
    setLastFilter(infoPlanets);
    setColumnFilterState((prevColumns) => {
      const updatedColumns = prevColumns
      .filter((columnAtt) => columnAtt !== newFilter.column);
      const firstColumn = updatedColumns[0];
      const columnString = String(firstColumn);
      theme.handleFilterColumn(columnString);
      return updatedColumns;
    });
    setFilter((prevFilter) => ({
      ...prevFilter,
      filters: [...prevFilter.filters, newFilter],
    }));
  };
  const handleRemoveFilter = (filterToRemove: Filter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      filters: prevFilter.filters.filter((filter) => filter !== filterToRemove),
    }));
    setColumnFilterState((prevColumn) => [...prevColumn, filterToRemove.column]);
    setInfoPlanets(lastFilter);
    if (columnFilterState.length === 4) {
      setInfoPlanets(originalData);
    }
  };
  const handleSortPlanets = () => {
    const columnPlanet = theme.filters.order.column as keyof ResultApi;
    const { sort } = theme.filters.order;
    const planets = [...infoPlanets];
    planets.sort((a: ResultApi, b: ResultApi): any => {
      const planetA = parseFloat(a[columnPlanet] as string);
      const planetB = parseFloat(b[columnPlanet] as string);
      const valuesPopulations = planets
      .map((info) => info.population.toString())
      .filter((fil) => fil !== 'unknown').map(Number);
      const maxValue = Math.max(...valuesPopulations, 0);
      if (sort === 'ASC') {
        const valueA = Number.isNaN(planetA) ? maxValue + 1 : planetA;
        const valueB = Number.isNaN(planetB) ? maxValue + 1 : planetB;
        return valueA - valueB;
      }
      const valueA = Number.isNaN(planetA) ? 0 : planetA;
      const valueB = Number.isNaN(planetB) ? 0 : planetB;
      return valueB - valueA;
    });
    setInfoPlanets(planets);
  };
  const handleRemoveAllFilters = () => {
    if (theme.filters.filterNumerics !== initialNumerics) {
      setFilter(initialFilter);
      setInfoPlanets(originalData);
    }
  };
  
  const handleShowForm = () => {
    setShowForm(!showForm);
  }
  
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    // Lógica de envio do formulário aqui, se necessário
    setShowForm(false); // Feche o modal após o envio
  };
  
  const setImgPlanets = () => {
    const namePlanet = infoPlanets.map((planet) => planet.name);
    const planet = imgPlanets.filter((item) => namePlanet.includes(item.name.toString()));
    if (planet) {
      const imgSrc = planet.map((item) => item.imgSrc);
      const namePlanet = planet.map((item) => item.name);
      const imgPlanetsArray = planet.map((planet, index) => ({
        name: namePlanet[index],
        imgSrc: imgSrc[index],
      }));
      setImgPlanetSrc(imgPlanetsArray);
    }
  }

  useEffect(() => {
      fetch();
  }, []);

  useEffect(() => {
    setImgPlanets();
  }, [infoPlanets, imgPlanets]);

  /*
  {loading && <div className="ball-loading-planets">
            <l-tail-chase
            size="40"
            speed="1.2"
            color="white" 
            ></l-tail-chase>
          </div>}
  */ 

  return (
    <>
      <FilterPlanets filters={ filters } handle={ handleRemoveFilter } />
      <div className='div-Search'>
      <div className='container-Search'>
        <div className='form-Search'>
      <form
      onSubmit={ (e) => {
        e.preventDefault();
      } }
      >
        <div className='field-group'>
          <div className='icon-group'>
        <FaSearch className='search-icon'/>
          </div>
          <div className='input-group'>
      <label className='search-label'>
          <input
            type="text"
            data-testid="name-filter"
            value={ filHook.textPlanet.value }
            className='inp-Search'
            onChange={ ({ target }) => filHook.handleChange(target.value) }
            />
        </label>
          </div>
        </div>
      </form>
        </div>
        <div className='button-Filter'>
        <button
        onClick={handleShowForm}
        className='button-Filter-Btn'
        >
          <IoFilterSharp className='icon-Filter'/>
        </button>
        </div>
      </div>
      </div>

      <Modal show={showForm} onHide={handleToggleForm} style={{ width: '100vw'}}>
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <form onSubmit={handleFormSubmit} className='form-container'>
            <Accordion>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Filtrar por</Accordion.Header>
                <Accordion.Body>
            <div className='flex-accordion'>
            <label>
              <span>Category:</span>
              <select
                data-testid="column-filter"
                value={filHook.selectColumn.value}
                name="selectColumn"
                onChange={({ target }) => {
                  filHook.handleColumn(target.value);
                }}
              >
                {columnFilterState.map((info) => (
                  <option key={info} value={info}>
                    {info}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Comparison:</span>
              <select
                data-testid="comparison-filter"
                value={filHook.selectComparasion.value}
                onChange={({ target }) => filHook.handleComparasion(target.value)}
              >
                <option>maior que</option>
                <option>igual a</option>
                <option>menor que</option>
              </select>
            </label>

            <label className='label-style'>
              <span>Value:</span>
              <input
                data-testid="value-filter"
                type="number"
                value={filHook.inputNumber.value}
                onChange={({ target }) => filHook.handleValue(parseInt(target.value, 10))}
                className='inp-value'
              />
            </label>

            <button data-testid="button-filter" onClick={handleButtonFilter}>
              FILTRAR
            </button>
            </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion style={{marginTop: 10}}>
              <Accordion.Item eventKey='0'>
                  <AccordionHeader>Ordenar por</AccordionHeader>
                  <AccordionBody>

            <div className='flex-accordion'>
            <label className='label-style'>
              <span>Category:</span>
              <select
                name=""
                id=""
                data-testid="column-sort"
                onChange={({ target }) => filHook.handleColumnSortName(target.value)}
              >
                <option>population</option>
                <option>orbital_period</option>
                <option>diameter</option>
                <option>rotation_period</option>
                <option>surface</option>
              </select>
            </label>

            <label className='label-style'>
              <input
                type="radio"
                name="inp-radio"
                id=""
                data-testid="column-sort-input-asc"
                value="ASC"
                onChange={({ target }) => filHook.handleSort(target.value)}
              />
              {' '}
              Ascendente

              <input
                type="radio"
                name="inp-radio"
                id=""
                data-testid="column-sort-input-desc"
                value="DESC"
                onChange={({ target }) => filHook.handleSort(target.value)}
              />
              {' '}
              Descendente
            </label>

            <button data-testid="column-sort-button" onClick={handleSortPlanets}>
              ORDENAR
            </button>
              </div>
                  </AccordionBody>
              </Accordion.Item>
              </Accordion>

          </form>
        </Modal.Body>
        <Modal.Footer className='modal_footer'>
          <Button variant="secondary" onClick={handleToggleForm}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='content-box'>
      {loading && 
    <div className="ball-loading-planets">
      <div>
            <l-tail-chase
            size="40"
            speed="1.2"
            color="white" 
            ></l-tail-chase>
      </div>
          </div>
      }
        <div className='box-Planets'>
            {infoPlanets.filter((info) => info.name.includes(theme.filters.filterByName))
              .map((info, index) => (
                <Link key={ index } to={`/planets/${info.name}`} className='link'>
                <div  key={ index } className='cart-Planet'>
                <div className='info-Planet'>
                <div key={ index }>
                  <div data-testid="planet-name">{info.name}</div>
                </div>
                <div className='img-Planet'>
                  {imgPlanetSrc
                    .filter((item) => item.name === info.name)
                    .map((item, indexIMG) => (
                      <div key={indexIMG}>
                        <img src={item.imgSrc} alt={item.name} />
                      </div>
                    ))}
                </div>
                  </div>
                </div>
                </Link>
              ))}
          </div>
      </div>

    </>
  );
}
export default Table;
