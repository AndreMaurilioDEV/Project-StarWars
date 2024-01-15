import { useContext, useEffect } from "react";
import api_Planets from "../../api";
import { useState } from "react";
import useFormInput from "../../hooks/useFormInput";
import themeContext from "../../theme/themeContext";

type resultApi = {
    name: string, 
    rotation_period: number, 
    orbital_period: number, 
    diameter: number, 
    climate: string, 
    gravity: string, 
    terrain: string, 
    surface_water: number, 
    population: number, 
    films: string[], 
    created: string, 
    edited: string, 
    url: string,
}

const initialFilter = {
    filters: [{
        column: '',
        comparasion: ' ',
        valueNumber: 0,
    }
    ]
};

type filter = {
    column: string;
    comparasion: string;
    valueNumber: number;
}

function Table () {

    const columnFilter = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const options = ['maior que', 'igual a', 'menor que'];
    const [columnFilterState, setColumnFilterState] = useState<string[]>(columnFilter);
    const [infoPlanets, setInfoPlanets] = useState<resultApi[]>([]);
    const [filters, setFilter] = useState(initialFilter);
    const textPlanet = useFormInput('');
    const selectColumn = useFormInput('');
    const selectComparasion = useFormInput(options[0]);
    const columnNameSort = useFormInput('population');
    const nameSort = useFormInput('ascendente');
    const inputNumber = useFormInput(0);
   
    const fetch = async () => {
        try {
            const planets = await api_Planets();
            setInfoPlanets(planets);
        } catch (error) {
            console.error('Erro ao buscar os planetas:', error);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const theme = useContext(themeContext);
    const tableHeaders = infoPlanets.length > 0 ?  Object.keys(infoPlanets[0]) : [];

    const handleChange = (value: string) => {
        textPlanet.onChange(value);
        theme.handleFilter(value);
    };

    const handleColumn = (value: string | number) => {
        const stringValue = String(value);
        selectColumn.onChange(stringValue);
        theme.handleFilterColumn(stringValue);
    };

    const handleComparasion = (value: string) => {
        selectComparasion.onChange(value);
        theme.handleFilterComparasion(value);
    }

    const handleValue = (value: number) => {
        console.log(value);
        inputNumber.onChange(value);
        theme.handleFilterValue(value);
    }

    const handleColumnSortName = (value: string) => {
        columnNameSort.onChange(value);
        theme.handleColumnSort(value);
    };

    const handleSort = (value: string) => {
        nameSort.onChange(value);
        theme.handleFilterSort(value);
    };

    const comparasionMath = (toComparasion: string, value: number, columnValue: number) => {
        if (toComparasion === 'maior que') {
            return columnValue > value;
        }

        if (toComparasion === 'igual a') {
            return columnValue === value;
        }

        if (toComparasion === 'menor que') {
            return columnValue < value;
        }
        return false;
    };

    const handleButtonFilter = () => {
        setInfoPlanets([]);
        const columnPlanet = theme.filters.filterNumerics.column  as keyof resultApi;
        const { column, comparasion, value } = theme.filters.filterNumerics;

        const filtered = infoPlanets.filter((info) => {
            const columnValue = parseFloat(info[columnPlanet] as string);
            if (Number.isNaN(columnValue)) {
                return false;
            }
            return comparasionMath (comparasion, value, columnValue);
        });

        setInfoPlanets(filtered);
        
            const newFilter = {
                column: column,
                comparasion,
                valueNumber: value
            };

            setColumnFilterState((prevColumns) => {
              const updatedColumns = prevColumns.filter((column) => column !== newFilter.column);
              const firstColumn = updatedColumns[0];
              const columnString = String(firstColumn);
              theme.handleFilterColumn(columnString);
              return updatedColumns;
          });

          setFilter((prevFilter) => ({
              ...prevFilter,
              filters: [...prevFilter.filters, newFilter]
            }));

        };


    const handleRemoveFilter = (filterToRemove: filter) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            filters: prevFilter.filters.filter((filter) => filter !== filterToRemove),
          }));

        setColumnFilterState((prevColumn) => [...prevColumn, filterToRemove.column]);
        fetch();
    };


    const handleSortPlanets = () => {
        const columnPlanet = theme.filters.order.column  as keyof resultApi;
        const sort = theme.filters.order.sort;
        const planets = [...infoPlanets];
        planets.sort ((a: resultApi, b: resultApi): any => {
            const planetA = parseFloat(a[columnPlanet] as string);
            const planetB = parseFloat(b[columnPlanet] as string);

            const valuesPopulations = planets.map((info) => info.population.toString()).filter((fil) =>  fil !== 'unknown').map(Number);
            const maxValue = Math.max(...valuesPopulations, 0);
            
            if (sort === 'ASC') {                     	
                const valueA = Number.isNaN(planetA) ? maxValue + 1 : planetA;
                const valueB = Number.isNaN(planetB) ? maxValue + 1 : planetB;
                return valueA - valueB;
            } 
            
            if (sort === 'DESC') {
                const valueA = Number.isNaN(planetA) ? 0 : planetA;
                const valueB = Number.isNaN(planetB) ? 0 : planetB;
                return valueB - valueA;
            }
        });
        setInfoPlanets(planets);
    };

    return (
        <>
         {filters && 
        <div>
            {filters.filters.map((info) => 
            <div>
                <span>{info.column}</span>
                <span>{info.comparasion}</span>
                <span>{info.valueNumber}</span>
            <div data-testid='filter'>
            <button
            onClick={() => handleRemoveFilter(info)}
            >
                Apagar
            </button>
            </div>
            </div>
            )}
        </div>
        }

        <form onSubmit={(e) => {
            e.preventDefault()
        }}>

        <label>
            <input type="text" 
            data-testid='name-filter'
            value={textPlanet.value}
            onChange={({target}) => handleChange(target.value)}
            />
        </label>

        <label>
            <select 
            data-testid='column-filter'
            value={selectColumn.value} 
            name="selectColumn"
            onChange={({target}) => {
                handleColumn(target.value);
            }}
            >
            {columnFilterState.map((info) => 
            <option key={info} value={info}>{info}</option>
            )}
            </select>
        </label>

        <label>
            <select 
            data-testid='comparison-filter'
            value={selectComparasion.value}
            onChange={({target}) => handleComparasion(target.value)}
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
            value={inputNumber.value}
            onChange={({target}) => handleValue(parseInt(target.value))} 
            />
        </label>

        <button
        data-testid="button-filter"
        onClick={handleButtonFilter}
        >
        FILTRAR
        </button>

        <label>
        <select 
        name="" 
        id=""
        data-testid='column-sort'
        onChange={({target}) => handleColumnSortName(target.value)}
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
        data-testid='column-sort-input-asc'
        value='ASC' 
        onChange={({target}) => handleSort(target.value)}
        /> ascendente

        <input 
        type="radio" 
        name="inp-radio" 
        id="" 
        data-testid='column-sort-input-desc'
        value='DESC' 
        onChange={({target}) => handleSort(target.value)}
        /> descendente
        </label>

        <button
        data-testid='column-sort-button'
        onClick={handleSortPlanets}
        >
            ORDENAR
        </button>

        </form>


        <table>
            <tr>
                {tableHeaders.map((header) => 
                <th>{header}</th>
                )}
            </tr>
            {infoPlanets.filter((info) => 
            info.name.includes(theme.filters.filterByName)
            ).map((info, index) => 
            <tr key={index}>
                <td data-testid='planet-name'>{info.name}</td>
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
            )}

        </table>
        </>
    )
};

export default Table;