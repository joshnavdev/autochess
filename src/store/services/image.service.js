// region Action Types
const importAll = (r) => {
  let images = {};
  Object.keys(r).forEach((item) => {
    images[item.replace(/.*assets\//g, '')] = r[item].default;
  });

  return images;
};
const images = importAll(import.meta.globEager('../../assets/*.png'));

// endregion

// region initialState
const initialState = {
  ...images,
};
// endregion

// region Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
// endregion

// region Exports
const actionTypes = {};

const actionCreators = {};

export { actionTypes, actionCreators };

export default reducer;
