import { filter, keys, map, reduce, sortBy } from 'lodash';
import { heroes } from '../data/heroes';
import { actionCreators as synergyStore } from './synergy.service';
// region Action Types
const SET_HERO = 'hero/SET';
const CHANGE_FILTERS = 'hero/CHANGE_FILTERS';
const ADD_SYNERGY_FILTER = 'hero/ADD_SYNERGY_FILTER';
const REMOVE_SYNERGY_FILTER = 'hero/REMOVE_SYNERGY_FILTER';
// endregion

const sortedHeroes = reduce(
  sortBy(
    map(heroes, (hero, key) => ({ key, hero })),
    ['hero.cost']
  ),
  (acc, { key, hero }) => ({ ...acc, [key]: hero }),
  {}
);
// region initialState
const initialState = {
  show: false,
  focused: null,
  heroes: { ...sortedHeroes },
  filters: {
    search: '',
    synergies: [],
  },
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_HERO:
      return {
        ...state,
        heroes: {
          ...state.heroes,
          ...action.res,
        },
        focused: { ...action.res },
      };
    case CHANGE_FILTERS: {
      return { ...state, filters: { ...state.filters, ...action.res } };
    }
    case ADD_SYNERGY_FILTER: {
      return {
        ...state,
        filters: { ...state.filters, synergies: [...state.filters.synergies, action.res] },
      };
    }
    case REMOVE_SYNERGY_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          synergies: filter(state.filters.synergies, (synergy) => synergy !== action.res),
        },
      };
    }
    default:
      return state;
  }
};
// endregion

// region Actions
const setData = (prop) => {
  return {
    type: SET_HERO,
    res: prop,
  };
};

const changeFilters = (filters) => {
  return {
    type: CHANGE_FILTERS,
    res: filters,
  };
};

const addSynergyFilter = (synergy) => {
  return {
    type: ADD_SYNERGY_FILTER,
    res: synergy,
  };
};

const removeSynergyFilter = (synergy) => ({
  type: REMOVE_SYNERGY_FILTER,
  res: synergy,
});

// endregion

// region Action Creators

const setHero = (hero) => {
  return (dispatch) => {
    dispatch(setData(hero));
  };
};

const updateHero = (name, position) => {
  return (dispatch, getState) => {
    const state = getState().heroes.heroes;
    const currentPosition = state[name].position;
    const hero = {
      [name]: {
        ...state[name],
        position: position ? position : currentPosition,
      },
    };
    dispatch(setData(hero));
  };
};

const selectHero = (name) => {
  return (dispatch, getState) => {
    const heroes = getState().heroes.heroes;
    if (heroes[name].position) {
      const hero = {
        ...heroes[name],
        position: null,
      };
      dispatch(
        setData({
          [name]: hero,
        })
      );
      const synergies = [];
      Object.keys(heroes[name]).map((prop) => {
        if (heroes[name][prop] === true) {
          synergies.push(prop);
        }
        return prop;
      });
      dispatch(synergyStore.removeSynergies(synergies));
    } else {
      const currentPositions = [];
      Object.keys(heroes).map((hero) => {
        if (heroes[hero].position) {
          currentPositions.push(heroes[hero].position);
        }
        return hero;
      });

      if (currentPositions.length === 10) {
        return;
      }

      const filterPositions = (position) => {
        return currentPositions.filter((x) => x === parseInt(position));
      };

      for (var i = 1; i <= 32; i++) {
        if (!filterPositions(i).length) {
          const hero = {
            ...heroes[name],
            position: i,
          };
          dispatch(
            setData({
              [name]: hero,
            })
          );
          break;
        }
      }
      const synergies = [];
      Object.keys(heroes[name]).map((prop) => {
        if (heroes[name][prop] === true) {
          synergies.push(prop);
        }
        return prop;
      });
      dispatch(synergyStore.addSynergies(synergies));
    }
  };
};

// endregion

// region Exports
const actionTypes = {
  SET_HERO,
};

const actionCreators = {
  setHero,
  selectHero,
  updateHero,
  changeFilters,
  addSynergyFilter,
  removeSynergyFilter,
};

export { actionTypes, actionCreators };

export default reducer;
