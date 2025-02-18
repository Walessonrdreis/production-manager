import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { MainLayout } from './layouts/MainLayout';
import { Typography, Box } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo ao Production Manager
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Sistema de Gerenciamento de Produção
          </Typography>
        </Box>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
