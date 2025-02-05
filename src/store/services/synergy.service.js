import { forEach, keys } from 'lodash';
import { synergies } from '../data/synergies';
// region Action Types
const SET_SYNERGY = 'synergy/SET';
const SET_ACTIVE = 'synergy/active';
// endregion

const sortedSynergies = {};

forEach(keys(synergies).sort(), (synergy) => {
  sortedSynergies[synergy] = synergies[synergy];
});

// region initialState
const initialState = {
  actives: {},
  synergies: sortedSynergies,
  active: null,
  count: 0,
  selectedSynergies: [],
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SYNERGY:
      return {
        ...state,
        ...action.res,
        active: null,
        count: 0,
      };
    case SET_ACTIVE: {
      return {
        ...state,
        active: action.res.active,
        count: action.res.count,
      };
    }
    default:
      return state;
  }
};
// endregion

// region Actions
const setSynergy = (prop) => {
  return { type: SET_SYNERGY, res: prop };
};

const setActive = (prop) => {
  return { type: SET_ACTIVE, res: prop };
};
// endregion
const demonSynergy = (actives) => {
  if (actives['demon'] >= 2) {
    const active = actives['demonhunter'] && actives['demonhunter'] >= 2 ? true : false;
    return active;
  }
  return true;
};

const synergyThreshold = (count, synergy) => {
  let active = undefined;
  Object.keys(synergy).map((prop) => {
    const threshold = parseInt(prop);
    if (threshold && count >= threshold) {
      active = synergy;
    }
    return prop;
  });
  return active;
};

const godSynergy = (heroes, synergies, actives) => {
  // no god heroes
  if (!heroes.Mars.position && !heroes.Zues.position) {
    return false;
  }
  const species = [];
  Object.keys(synergies).map((synergy) => {
    if (!synergies[synergy].race) {
      return synergy;
    }
    if (synergy === 'god') {
      return synergy;
    }
    if (synergies[synergy].active) {
      const activeSynergy = synergyThreshold(actives[synergy], synergies[synergy]);
      if (activeSynergy) {
        species.push(activeSynergy);
      }
    }
    return synergy;
  });
  return species.length === 0;
};
// region Action Creators
const activateSynergies = (synergies, actives) => {
  Object.keys(actives).map((active) => {
    if (actives[active] < 1) {
      synergies[active].active = false;
    } else {
      switch (active) {
        case 'demon':
          synergies[active].active = demonSynergy(actives);
          break;
        default:
          synergies[active].active = true;
          break;
      }
    }
    return active;
  });
  return synergies;
};

const addSynergies = (actives) => {
  return (dispatch, getState) => {
    const heroes = getState().heroes.heroes;
    const state = { ...getState().synergies };
    actives.map((active) => {
      if (state.actives[active]) {
        state.actives[active]++;
      } else {
        state.actives[active] = 1;
      }
      return active;
    });
    state.synergies = activateSynergies(state.synergies, state.actives);
    state.synergies.god.active = godSynergy(heroes, state.synergies, state.actives);
    dispatch(setSynergy(state));
  };
};

const removeSynergies = (actives) => {
  return (dispatch, getState) => {
    const heroes = getState().heroes.heroes;
    const state = { ...getState().synergies };
    actives.map((active) => {
      state.actives[active]--;
      return active;
    });
    state.synergies = activateSynergies(state.synergies, state.actives);
    state.synergies.god.active = godSynergy(heroes, state.synergies, state.actives);
    dispatch(setSynergy(state));
  };
};

const setActiveSynergy = (active, count) => {
  return (dispatch) => {
    const state = {
      count,
      active,
    };
    dispatch(setActive(state));
  };
};

// region Exports
const actionTypes = {};

const actionCreators = {
  addSynergies,
  removeSynergies,
  setActiveSynergy,
};

export { actionTypes, actionCreators };

export default reducer;
