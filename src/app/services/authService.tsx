
interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface AuthError {
  error: string;
  details?: string;
}

const API_BASE_URL = 'http://localhost:3000/api';

export const authService = {
  /**
   * Sign up a new user
   * @param payload - User signup data (name, email, password)
   * @returns Promise with signup response containing token and user data
   */
  signup: async (payload: SignupPayload): Promise<SignupResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data: SignupResponse = await response.json();
      
      // Store token in localStorage for authenticated requests
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during signup';
      console.error('Signup error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Login a user
   * @param payload - User login data (email, password)
   * @returns Promise with login response containing token and user data
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      
      // Store token in localStorage for authenticated requests
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during login';
      console.error('Login error:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
};
