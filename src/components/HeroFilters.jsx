import { connect } from 'react-redux';
import { actionCreators as heroActions } from '../store/services/hero.service';

const HeroFilters = ({ filters, changeFilters }) => {
  const handleInputChange = (ev) => {
    changeFilters({
      ...filters,
      search: ev.target.value,
    });
  };

  return (
    <div className="">
      <div className="relative">
        <div className="absolute inset-y-0 left-[10px] flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          value={filters.search}
          onChange={handleInputChange}
          type="search"
          id="search"
          placeholder="Search by hero name"
          className="w-[95%] pl-10 m-[10px] text-sm text-white border border-gray-600 rounded-lg bg-gray-700"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { heroes } = state;
  return {
    filters: heroes.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilters: (filters) => dispatch(heroActions.changeFilters(filters)),
  };
};

const HeroFiltersConnected = connect(mapStateToProps, mapDispatchToProps)(HeroFilters);

export default HeroFiltersConnected;
