import { createContext } from 'react';

type ThemeContextType = {
  filters: {
    filterByName: string;
    filterNumerics: {
      column: string,
      comparasion: string,
      value: number,
    }
    order: {
      column: string,
      sort: string,
    }
  },
  handleFilter: (value: string) => void;
  handleFilterColumn: (value: string) => void;
  handleFilterComparasion: (value: string) => void;
  handleFilterValue: (value: number) => void;
  handleFilterSort: (value: string) => void;
  handleColumnSort: (value: string) => void;
};

const themeContext = createContext({} as ThemeContextType);

export default themeContext;
