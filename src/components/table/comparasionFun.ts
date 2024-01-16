export const comparasionMath = (
  toComparasion: string,
  value: number,
  columnValue: number,
) => {
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

export const initialFilter = {
  filters: [{
    column: '',
    comparasion: ' ',
    valueNumber: 0,
  },
  ],
};

export type Filter = {
  column: string;
  comparasion: string;
  valueNumber: number;
};

export const columnFilter = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
