import { Filter } from '../table/comparasionFun';
import './filter.css';
import { MdDelete } from "react-icons/md";

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
            <div key={ index } className='box-Filters'>
              {info.column && (
                <div className='flex-Filters'>
                  <div className='filters'>
                  <span>{info.column}</span>
                  <span>{info.comparasion}</span>
                  <span>{info.valueNumber}</span>
                  </div>
                  <div 
                  data-testid="filter"
                  className='btn-Remove-Filter'
                  >
                    <button onClick={ () => handle(info) }>
                    <MdDelete className='icon-Delete'/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterPlanets;
