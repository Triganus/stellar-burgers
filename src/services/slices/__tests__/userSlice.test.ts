import userReducer, {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  initialState
} from '../userSlice';
import { TUser } from '../../../utils/types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const mockAuthResponse = {
  user: mockUser,
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

describe('User Slice', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('registerUser', () => {
    it('should handle pending state', () => {
      const action = { type: registerUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(false);
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(false);
    });
  });

  describe('loginUser', () => {
    it('should handle pending state', () => {
      const action = { type: loginUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(false);
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(false);
    });
  });

  describe('logoutUser', () => {
    it('should handle fulfilled state', () => {
      const stateWithUser = {
        user: mockUser,
        isAuthChecked: true,
        loading: false,
        error: null
      };

      const action = { type: logoutUser.fulfilled.type };
      const newState = userReducer(stateWithUser, action);

      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
    });
  });

  describe('getUser', () => {
    it('should handle pending state', () => {
      const action = { type: getUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(false);
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
    });

    it('should handle rejected state', () => {
      const action = { type: getUser.rejected.type };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should handle pending state', () => {
      const action = { type: updateUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(mockUser);
      expect(newState.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const newState = userReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });
});
