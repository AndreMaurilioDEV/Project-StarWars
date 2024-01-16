import { useContext } from 'react';
import themeContext from '../theme/themeContext';
import useFormInput from './useFormInput';

export const useFilters = () => {
  const theme = useContext(themeContext);
  const textPlanet = useFormInput('');
  const selectColumn = useFormInput('');
  const selectComparasion = useFormInput('maior que');
  const columnNameSort = useFormInput('population');
  const nameSort = useFormInput('ascendente');
  const inputNumber = useFormInput(0);

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
  };

  const handleValue = (value: number) => {
    inputNumber.onChange(value);
    theme.handleFilterValue(value);
  };

  const handleColumnSortName = (value: string) => {
    columnNameSort.onChange(value);
    theme.handleColumnSort(value);
  };

  const handleSort = (value: string) => {
    nameSort.onChange(value);
    theme.handleFilterSort(value);
  };

  return {
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
  };
};
