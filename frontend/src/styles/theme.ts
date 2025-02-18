export const theme = {
  colors: {
    primary: '#2F80ED',
    secondary: '#56CCF2',
    success: '#27AE60',
    error: '#EB5757',
    warning: '#F2C94C',
    background: '#F5F5F5',
    white: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    border: '#E0E0E0',
  },
  fonts: {
    regular: 'Roboto, sans-serif',
    medium: 'Roboto Medium, sans-serif',
    bold: 'Roboto Bold, sans-serif',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    large: '1440px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
} as const; 