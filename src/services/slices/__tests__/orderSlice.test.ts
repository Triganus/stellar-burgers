import orderReducer, { createOrder, clearOrder, initialState } from '../orderSlice';
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

const mockOrderResponse = {
  order: mockOrder,
  name: 'Test Order'
};

describe('Order Slice', () => {

  it('should return initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('createOrder', () => {
    it('should handle pending state', () => {
      const action = { type: createOrder.pending.type };
      const newState = orderReducer(initialState, action);

      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.orderModalData).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrderResponse
      };
      const newState = orderReducer(initialState, action);

      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(mockOrder);
      expect(newState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to create order';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const newState = orderReducer(initialState, action);

      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.orderModalData).toBeNull();
    });

    it('should handle rejected state with default error message', () => {
      const action = {
        type: createOrder.rejected.type,
        error: {}
      };
      const newState = orderReducer(initialState, action);

      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe('Не удалось создать заказ');
      expect(newState.orderModalData).toBeNull();
    });

    it('should clear error on pending', () => {
      const stateWithError = {
        orderRequest: false,
        orderModalData: null,
        error: 'Previous error'
      };

      const action = { type: createOrder.pending.type };
      const newState = orderReducer(stateWithError, action);

      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBeNull();
    });
  });

  describe('clearOrder', () => {
    it('should clear order modal data and error', () => {
      const stateWithOrder = {
        orderRequest: false,
        orderModalData: mockOrder,
        error: 'Some error'
      };

      const newState = orderReducer(stateWithOrder, clearOrder());

      expect(newState.orderModalData).toBeNull();
      expect(newState.error).toBeNull();
      expect(newState.orderRequest).toBe(false);
    });
  });
});
