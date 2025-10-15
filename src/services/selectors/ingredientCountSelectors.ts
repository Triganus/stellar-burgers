import { RootState } from '../store';

export const selectIngredientCount = (state: RootState) => {
  const { bun, ingredients } = state.burgerConstructor;
  const counts: { [key: string]: number } = {};

  if (bun) {
    counts[bun._id] = 2;
  }

  ingredients.forEach((ingredient) => {
    if (counts[ingredient._id]) {
      counts[ingredient._id]++;
    } else {
      counts[ingredient._id] = 1;
    }
  });

  return counts;
};
