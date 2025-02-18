import styled, { css, DefaultTheme } from 'styled-components';

interface ContainerProps {
  variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

type VariantStyles = {
  [key in ContainerProps['variant']]: ReturnType<typeof css>;
};

const getVariantStyles = (theme: DefaultTheme) => {
  const variants: VariantStyles = {
    primary: css`
      background: ${theme.colors.primary};
    `,
    secondary: css`
      background: ${theme.colors.secondary};
    `,
    success: css`
      background: ${theme.colors.success};
    `,
    error: css`
      background: ${theme.colors.error};
    `,
    warning: css`
      background: ${theme.colors.warning};
    `,
  };

  return variants;
};

export const Container = styled.button<ContainerProps>`
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 0;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  transition: filter 0.2s;

  ${({ theme, variant }) => getVariantStyles(theme)[variant]}

  &:hover {
    filter: brightness(0.9);
  }
`; 