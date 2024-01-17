import { Filter } from '../table/comparasionFun';

type FilterType = {
  filters: {
    filters: {
      column: string;
      comparasion: string;
      valueNumber: number;
    }[];
  },
  handle: (filter: Filter) => void;
};

function FilterPlanets({ filters, handle } : FilterType) {
  return (
    <div>
      {filters && filters.filters.length > 0 && (
        <div>
          {filters.filters.map((info, index) => (
            <div key={ index }>
              {info.column && (
                <>
                  <span>{info.column}</span>
                  <span>{info.comparasion}</span>
                  <span>{info.valueNumber}</span>
                  <div data-testid="filter">
                    <button onClick={ () => handle(info) }>
                      X
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterPlanets;
