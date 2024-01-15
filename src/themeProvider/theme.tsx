import React, { useState } from "react";
import themeContext from "../theme/themeContext";
import useFormInput from "../hooks/useFormInput";

 type childrenProps = {
    children: React.ReactNode
 }


function ThemeProvider ({children} : childrenProps) {
    const columnFilter = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const textPlanet = useFormInput('');
    const [name, setName] = useState('');
    const [column, setColumn] = useState('population');
    const [columnSort, setColumnSort] = useState('population');
    const [sort, setSort] = useState('asc');
    const [comparasionFilter, setComparasion] = useState('maior que');
    const [valueFilter, setValue] = useState(0);
    

    const handleFilter = (value: string) => {
        setName(value)
    };

    const handleFilterColumn = (value: string) => {
        setColumn(value);
    };

    const handleFilterComparasion = (value: string) => {
        setComparasion(value)
    };

    const handleFilterValue = (value: number) => {
        setValue(value)
    };

    const handleColumnSort = (value: string) => {
        setColumnSort(value)
    }

    const handleFilterSort = (value: string) => {
        setSort(value);
    }

    const values = {
        filters: {
            filterByName: name, 
            filterNumerics: {
                column,
                comparasion: comparasionFilter,
                value: valueFilter,
            },
            order: {
                column: columnSort,
                sort,
            }
        }, 
            handleFilter, 
            handleFilterColumn, 
            handleFilterComparasion, 
            handleFilterValue,
            handleColumnSort,
            handleFilterSort
    }

    return (
        <themeContext.Provider value={values}>
            {children}
        </themeContext.Provider>
    )
};

export default ThemeProvider;