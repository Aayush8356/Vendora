'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { apiClient } from '@/lib/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => Promise<void>;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: User }
  | { type: 'LOAD_USER_SUCCESS'; payload: User };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          apiClient.setToken(token);
          const response = await apiClient.getMe();
          if (response.success && response.data?.user) {
            dispatch({
              type: 'LOAD_USER_SUCCESS',
              payload: response.data.user as User,
            });
          } else {
            localStorage.removeItem('token');
            apiClient.setToken(null);
            dispatch({ type: 'LOGIN_FAILURE' });
          }
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('token');
          apiClient.setToken(null);
          dispatch({ type: 'LOGIN_FAILURE' });
        }
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await apiClient.login({ email, password });
      
      if (response.success && response.data?.user && response.data?.token) {
        const { user, token } = response.data;
        apiClient.setToken(token as string);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: user as User, token: token as string },
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await apiClient.register(userData);
      
      if (response.success && response.data?.user && response.data?.token) {
        const { user, token } = response.data;
        apiClient.setToken(token as string);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: user as User, token: token as string },
        });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    apiClient.setToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    try {
      const response = await apiClient.updateProfile(userData);
      
      if (response.success && response.data?.user) {
        dispatch({
          type: 'UPDATE_PROFILE_SUCCESS',
          payload: response.data.user as User,
        });
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};