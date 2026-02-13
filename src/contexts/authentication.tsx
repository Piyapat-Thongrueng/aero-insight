import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  created_at: string;
}

interface AuthState {
  loading: boolean | null;
  getUserLoading: boolean | null;
  error: string | null;
  user: User | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  state: AuthState;
  login: (data: LoginData) => Promise<{ error?: string } | void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<{ error?: string } | void>;
  isAuthenticated: boolean;
  fetchUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ErrorResponse {
  error: string;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined,
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // Fetch user details using Supabase API
  const fetchUser = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState((prevState) => ({
        ...prevState,
        user: null,
        getUserLoading: false,
      }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      const response = await axios.get<User>(
        `${API_BASE_URL}/auth/get-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setState((prevState) => ({
        ...prevState,
        user: response.data,
        getUserLoading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setState((prevState) => ({
        ...prevState,
        error:
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Failed to fetch user",
        user: null,
        getUserLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchUser(); // Load user on initial app load
  }, []);

  // Login user
  const login = async (data: LoginData): Promise<{ error?: string } | void> => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        data,
      );
      const token = response.data.access_token;
      localStorage.setItem("token", token);

      // Fetch and set user details
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/");
      await fetchUser();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.error || "Login failed";

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));

      return { error: errorMessage };
    }
  };

  // Register user
  const register = async (data: RegisterData,): Promise<{ error?: string } | void> => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      await axios.post(`${API_BASE_URL}/auth/register`, data);
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/sign-up/success");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Registration failed";

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
      }));
      return { error: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, error: null, loading: null, getUserLoading: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(state.user);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for consuming AuthContext
const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};

export { AuthProvider, useAuth };
export type { User, AuthState, LoginData, RegisterData };