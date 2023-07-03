import { connect } from 'react-redux';
import { actionCreators as heroActions } from '../store/services/hero.service';
import SearchInput from './Input/SearchInput';
import SelectSearchInput from './Input/SelectSearchInput';
import { includes, map } from 'lodash';

const HeroFilters = ({
  filters,
  synergyOptions,
  changeFilters,
  addSynergyFilter,
  removeSynergyFilter,
}) => {
  const handleInputChange = (ev) => {
    changeFilters({
      ...filters,
      search: ev.target.value,
    });
  };

  const handleSynergySelect = (synergy) => {
    addSynergyFilter(synergy);
  };

  const handleRemoveSynergyFilter = (synergy) => {
    removeSynergyFilter(synergy);
  };

  return (
    <>
      <div id="filter-hero">
        <SearchInput
          value={filters.search}
          onChange={handleInputChange}
          placeHolder="Search by hero"
        />
      </div>
      <div id="filter-synergy">
        <SelectSearchInput
          options={synergyOptions}
          selectedOptions={filters.synergies}
          onSelect={handleSynergySelect}
          onRemove={handleRemoveSynergyFilter}
          placeHolder="Search by synergy"
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { heroes, synergies } = state;

  return {
    filters: heroes.filters,
    synergyOptions: map(synergies.synergies, (_, synergyName) => synergyName),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilters: (filters) => dispatch(heroActions.changeFilters(filters)),
    addSynergyFilter: (synergy) => dispatch(heroActions.addSynergyFilter(synergy)),
    removeSynergyFilter: (synergy) => dispatch(heroActions.removeSynergyFilter(synergy)),
  };
};

const HeroFiltersConnected = connect(mapStateToProps, mapDispatchToProps)(HeroFilters);

export default HeroFiltersConnected;
