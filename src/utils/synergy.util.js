// TODO: Make it hook with callback
export function getThhreshholds(synergy) {
  let min = 100;
  let max = 0;

  Object.keys(synergy).forEach((synergyProp) => {
    const propNumber = Number(synergyProp);

    if (Number.isInteger(propNumber)) {
      min = min > propNumber ? propNumber : min;
      max = max < propNumber ? propNumber : max;
    }
  });

  return [min, max];
}
