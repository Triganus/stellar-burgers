import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 100,
  price: 200,
  image: 'test-image.png',
  image_mobile: 'test-image-mobile.png',
  image_large: 'test-image-large.png'
};

const mockBun: TIngredient = {
  _id: '2',
  name: 'Test Bun',
  type: 'bun',
  proteins: 20,
  fat: 10,
  carbohydrates: 30,
  calories: 200,
  price: 300,
  image: 'test-bun-image.png',
  image_mobile: 'test-bun-image-mobile.png',
  image_large: 'test-bun-image-large.png'
};

describe('Constructor Slice', () => {
  it('should return initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('addIngredient', () => {
    it('should add bun ingredient', () => {
      const action = addIngredient(mockBun);
      const newState = constructorReducer(initialState, action);

      expect(newState.bun).toEqual({
        ...mockBun,
        id: expect.any(String)
      });
      expect(newState.ingredients).toEqual([]);
    });

    it('should add main ingredient to ingredients array', () => {
      const action = addIngredient(mockIngredient);
      const newState = constructorReducer(initialState, action);

      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual({
        ...mockIngredient,
        id: expect.any(String)
      });
    });

    it('should replace existing bun when adding new bun', () => {
      const firstBun = { ...mockBun, _id: 'bun1' };
      const secondBun = { ...mockBun, _id: 'bun2' };

      const stateWithBun = constructorReducer(
        initialState,
        addIngredient(firstBun)
      );
      const newState = constructorReducer(
        stateWithBun,
        addIngredient(secondBun)
      );

      expect(newState.bun).toEqual({
        ...secondBun,
        id: expect.any(String)
      });
      expect(newState.bun?._id).toBe('bun2');
    });
  });

  describe('removeIngredient', () => {
    it('should remove ingredient by id', () => {
      const ingredient1 = { ...mockIngredient, id: '1' };
      const ingredient2 = { ...mockIngredient, id: '2' };

      const stateWithIngredients = {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      };

      const newState = constructorReducer(
        stateWithIngredients,
        removeIngredient('1')
      );

      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual(ingredient2);
    });

    it('should not remove anything if ingredient id not found', () => {
      const ingredient = { ...mockIngredient, id: '1' };

      const stateWithIngredient = {
        bun: null,
        ingredients: [ingredient]
      };

      const newState = constructorReducer(
        stateWithIngredient,
        removeIngredient('999')
      );

      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual(ingredient);
    });
  });

  describe('moveIngredient', () => {
    it('should move ingredient from one position to another', () => {
      const ingredient1 = { ...mockIngredient, id: '1' };
      const ingredient2 = { ...mockIngredient, id: '2' };
      const ingredient3 = { ...mockIngredient, id: '3' };

      const stateWithIngredients = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      };

      // Move ingredient from index 0 to index 2
      const newState = constructorReducer(
        stateWithIngredients,
        moveIngredient({ fromIndex: 0, toIndex: 2 })
      );

      expect(newState.ingredients).toEqual([
        ingredient2,
        ingredient3,
        ingredient1
      ]);
    });

    it('should handle move to same position', () => {
      const ingredient1 = { ...mockIngredient, id: '1' };
      const ingredient2 = { ...mockIngredient, id: '2' };

      const stateWithIngredients = {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      };

      const newState = constructorReducer(
        stateWithIngredients,
        moveIngredient({ fromIndex: 0, toIndex: 0 })
      );

      expect(newState.ingredients).toEqual([ingredient1, ingredient2]);
    });
  });

  describe('clearConstructor', () => {
    it('should clear all ingredients and bun', () => {
      const stateWithIngredients = {
        bun: { ...mockBun, id: 'bun1' },
        ingredients: [
          { ...mockIngredient, id: '1' },
          { ...mockIngredient, id: '2' }
        ]
      };

      const newState = constructorReducer(
        stateWithIngredients,
        clearConstructor()
      );

      expect(newState).toEqual(initialState);
    });
  });
});
