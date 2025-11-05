import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 15,
    calories: 100,
    price: 200,
    image: 'test-image-1.png',
    image_mobile: 'test-image-1-mobile.png',
    image_large: 'test-image-1-large.png'
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'bun',
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
    calories: 200,
    price: 300,
    image: 'test-image-2.png',
    image_mobile: 'test-image-2-mobile.png',
    image_large: 'test-image-2-large.png'
  }
];

describe('Ingredients Slice', () => {
  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('fetchIngredients', () => {
    it('should handle pending state', () => {
      const action = { type: fetchIngredients.pending.type };
      const newState = ingredientsReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual([]);
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const newState = ingredientsReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual(mockIngredients);
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch ingredients';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const newState = ingredientsReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.ingredients).toEqual([]);
    });

    it('should handle rejected state with default error message', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: {}
      };
      const newState = ingredientsReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe('Не удалось загрузить ингредиенты');
      expect(newState.ingredients).toEqual([]);
    });

    it('should clear error on pending', () => {
      const stateWithError = {
        ingredients: [],
        loading: false,
        error: 'Previous error'
      };

      const action = { type: fetchIngredients.pending.type };
      const newState = ingredientsReducer(stateWithError, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  });
});
