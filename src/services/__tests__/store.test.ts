import store from '../store';
import { RootState } from '../store';

describe('Store Configuration', () => {
  it('should have correct initial state', () => {
    const state = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
  });

  it('should handle unknown action', () => {
    const initialState = store.getState();
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const newState = store.getState();

    // State should remain unchanged for unknown action
    expect(newState).toEqual(initialState);
  });

  it('should have correct initial state structure', () => {
    const state = store.getState();

    // Check ingredients slice
    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    // Check constructor slice
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    // Check user slice
    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      loading: false,
      error: null
    });

    // Check order slice
    expect(state.order).toEqual({
      orderRequest: false,
      orderModalData: null,
      error: null
    });

    // Check feed slice
    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      userOrders: [],
      currentOrder: null,
      loading: false,
      error: null
    });
  });
});
