import feedReducer, {
  fetchFeeds,
  fetchOrders,
  fetchOrderByNumber,
  clearCurrentOrder,
  initialState
} from '../feedSlice';
import { TOrder } from '../../../utils/types';

const mockOrder: TOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient1', 'ingredient2']
};

const mockFeedsResponse = {
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

describe('Feed Slice', () => {

  it('should return initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchFeeds', () => {
    it('should handle pending state', () => {
      const action = { type: fetchFeeds.pending.type };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.orders).toEqual([]);
      expect(newState.total).toBe(0);
      expect(newState.totalToday).toBe(0);
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsResponse
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.orders).toEqual(mockFeedsResponse.orders);
      expect(newState.total).toBe(mockFeedsResponse.total);
      expect(newState.totalToday).toBe(mockFeedsResponse.totalToday);
      expect(newState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch feeds';
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.orders).toEqual([]);
    });
  });

  describe('fetchOrders', () => {
    it('should handle pending state', () => {
      const action = { type: fetchOrders.pending.type };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.userOrders).toEqual([]);
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: [mockOrder]
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.userOrders).toEqual([mockOrder]);
      expect(newState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch orders';
      const action = {
        type: fetchOrders.rejected.type,
        error: { message: errorMessage }
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.userOrders).toEqual([]);
    });
  });

  describe('fetchOrderByNumber', () => {
    it('should handle pending state', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.currentOrder).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.currentOrder).toEqual(mockOrder);
      expect(newState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch order';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const newState = feedReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.currentOrder).toBeNull();
    });
  });

  describe('clearCurrentOrder', () => {
    it('should clear current order', () => {
      const stateWithOrder = {
        ...initialState,
        currentOrder: mockOrder
      };

      const newState = feedReducer(stateWithOrder, clearCurrentOrder());

      expect(newState.currentOrder).toBeNull();
    });
  });
});
