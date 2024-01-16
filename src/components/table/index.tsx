import { useContext, useEffect, useState } from 'react';
import apiPlanets from '../../api';
import themeContext from '../../theme/themeContext';
import ResultApi from '../../api/typeApi';
import { comparasionMath, columnFilter,
  initialFilter, Filter } from './comparasionFun';
import { useFilters } from '../../hooks/useFilter';
import FilterPlanets from '../filterPlanets';

function Table() {
  const [columnFilterState, setColumnFilterState] = useState<string[]>(columnFilter);
  const [infoPlanets, setInfoPlanets] = useState<ResultApi[]>([]);
  const [filters, setFilter] = useState(initialFilter);
  const {
    textPlanet,
    selectColumn,
    selectComparasion,
    inputNumber,
    handleChange,
    handleColumn,
    handleComparasion,
    handleValue,
    handleColumnSortName,
    handleSort,
  } = useFilters();

  const fetch = async () => {
    try {
      const planets = await apiPlanets();
      setInfoPlanets(planets);
    } catch (error) {
      console.error('Erro ao buscar os planetas:', error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const theme = useContext(themeContext);
  const tableHeaders = infoPlanets.length > 0 ? Object.keys(infoPlanets[0]) : [];

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
    fetch();
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

  return (
    <>
      <FilterPlanets filters={ filters } handle={ handleRemoveFilter } />
      <form
        onSubmit={ (e) => {
          e.preventDefault();
        } }
      >
        <label>
          <input
            type="text"
            data-testid="name-filter"
            value={ textPlanet.value }
            onChange={ ({ target }) => handleChange(target.value) }
          />
        </label>

        <label>
          <select
            data-testid="column-filter"
            value={ selectColumn.value }
            name="selectColumn"
            onChange={ ({ target }) => {
              handleColumn(target.value);
            } }
          >
            {columnFilterState.map((info) => (
              <option
                key={ info }
                value={ info }
              >
                {info}
              </option>
            ))}
          </select>
        </label>

        <label>
          <select
            data-testid="comparison-filter"
            value={ selectComparasion.value }
            onChange={ ({ target }) => handleComparasion(target.value) }
          >
            <option>maior que</option>
            <option>igual a</option>
            <option>menor que</option>
          </select>
        </label>

        <label>
          <input
            data-testid="value-filter"
            type="number"
            value={ inputNumber.value }
            onChange={ ({ target }) => handleValue(parseInt(target.value, 10)) }
          />
        </label>

        <button
          data-testid="button-filter"
          onClick={ handleButtonFilter }
        >
          FILTRAR
        </button>

        <label>
          <select
            name=""
            id=""
            data-testid="column-sort"
            onChange={ ({ target }) => handleColumnSortName(target.value) }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface</option>
          </select>
        </label>

        <label>
          <input
            type="radio"
            name="inp-radio"
            id=""
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ ({ target }) => handleSort(target.value) }
          />
          {' '}
          ascendente

          <input
            type="radio"
            name="inp-radio"
            id=""
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ ({ target }) => handleSort(target.value) }
          />
          {' '}
          descendente
        </label>
        <button
          data-testid="column-sort-button"
          onClick={ handleSortPlanets }
        >
          ORDENAR
        </button>
      </form>
      <table>
        <tr>
          {tableHeaders.map((header, index) => <th key={ index }>{header}</th>)}
        </tr>
        {infoPlanets.filter((info) => info.name.includes(theme.filters.filterByName))
          .map((info, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{info.name}</td>
              <td>{info.rotation_period}</td>
              <td>{info.orbital_period}</td>
              <td>{info.diameter}</td>
              <td>{info.climate}</td>
              <td>{info.gravity}</td>
              <td>{info.terrain}</td>
              <td>{info.surface_water}</td>
              <td>{info.population}</td>
              <td>{info.films}</td>
              <td>{info.created}</td>
              <td>{info.edited}</td>
              <td>{info.url}</td>
            </tr>
          ))}
      </table>
    </>
  );
}
export default Table;
