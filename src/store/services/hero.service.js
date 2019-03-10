import {
  heroes
} from '../data/heroes';
import {
  actionCreators as synergyStore
} from "./synergy.service";
// region Action Types
const SET_HERO = 'hero/SET';
const TOGGLE_HEROES = 'hero/TOGGLE';
// endregion

// region initialState
const initialState = {
  show: false,
  heroes: {...heroes}
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {

  switch (action.type) {
    case TOGGLE_HEROES: {
      return {
        ...state,
        show: action.res
      }
    }
    case SET_HERO:
      return {
        ...state,
        heroes: {
          ...state.heroes,
          ...action.res
        }
      }
    default:
      return state;
  }
}
// endregion

// region Actions
const setData = (prop) => {
  return {
    type: SET_HERO,
    res: prop
  };
}

const toggleHero = (value) => {
  return {
    type: TOGGLE_HEROES,
    res: value
  }
}
// endregion

// region Action Creators

const setHero = (hero) => {
  return (dispatch) => {
    dispatch(setData(hero));
  }
}

const updateHero = (name, position) => {
  return (dispatch, getState) => {
    const state = getState().heroes.heroes;
    const hero = {
      [name]: {
        ...state[name],
        position: position
      }
    }
    dispatch(setData(hero));
  }
}

const selectHero = (name) => {
  return (dispatch, getState) => {
    const heroes = getState().heroes.heroes;
    if (heroes[name].position) {
      const hero = {
        ...heroes[name],
        position: null
      }
      dispatch(setData({
        [name]: hero
      }))
      const synergies = [];
      Object.keys(heroes[name]).map(prop => {
        if (heroes[name][prop] === true) {
          synergies.push(prop)
        }
        return prop;
      })
      dispatch(synergyStore.removeSynergies(synergies))
    } else {
      const currentPositions = [];
      Object.keys(heroes).map(hero => {
        if (heroes[hero].position) {
          currentPositions.push(heroes[hero].position);
        }
        return hero;
      });

      if (currentPositions.length === 10) {
        return;
      }

      const filterPositions = (position) => {
        return currentPositions.filter(x => x === parseInt(position));
      }

      for (var i = 1; i <= 32; i++) {
        if (!filterPositions(i).length) {
          const hero = {
            ...heroes[name],
            position: i
          }
          dispatch(setData({
            [name]: hero
          }));
          break;
        }
      }
      const synergies = [];
      Object.keys(heroes[name]).map(prop => {
        if (heroes[name][prop] === true) {
          synergies.push(prop)
        }
        return prop;
      })
      dispatch(synergyStore.addSynergies(synergies))
    }

  }
}

// endregion

// region Exports
const actionTypes = {
  SET_HERO,
};

const actionCreators = {
  setHero,
  toggleHero,
  selectHero,
  updateHero
};

export {
  actionTypes,
  actionCreators
};

export default reducer;
