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
      color: ${theme.colors.white};
      border: none;

      &:hover {
        background: ${theme.colors.primary}ee;
      }
    `,
    secondary: css`
      background: ${theme.colors.white};
      color: ${theme.colors.primary};
      border: none;
      font-weight: 600;

      &:hover {
        background: ${theme.colors.white}ee;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    `,
    success: css`
      background: ${theme.colors.success};
      color: ${theme.colors.white};
      border: none;
    `,
    error: css`
      background: ${theme.colors.error};
      color: ${theme.colors.white};
      border: none;
    `,
    warning: css`
      background: ${theme.colors.warning};
      color: ${theme.colors.text};
      border: none;
    `,
  };

  return variants;
};

export const Container = styled.button<ContainerProps>`
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;

  ${({ theme, variant }) => getVariantStyles(theme)[variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`; 