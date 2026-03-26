'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api, { AuthResponse, LoginRequest, RegisterRequest, UsuarioResponse } from '@/lib/api';

interface AuthContextType {
  user: UsuarioResponse | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const isAuthPage = pathname === '/login' || pathname === '/register';
    
    if (!token && !isAuthPage) {
      router.push('/login');
    } else if (token && isAuthPage) {
      router.push('/');
    }
  }, [token, pathname, router]);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const response: AuthResponse = await api.auth.login(data);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
        createdAt: new Date().toISOString(),
      });
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response: AuthResponse = await api.auth.register(data);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
        createdAt: new Date().toISOString(),
      });
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
