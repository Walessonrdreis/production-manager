import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { UserProfile } from './pages/UserProfile';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';
import { Layout } from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rotas Privadas */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Layout>
                  <UserProfile />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/products" element={
              <PrivateRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/orders" element={
              <PrivateRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/customers" element={
              <PrivateRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/reports" element={
              <PrivateRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/settings" element={
              <PrivateRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </PrivateRoute>
            } />

            {/* Rota de fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
