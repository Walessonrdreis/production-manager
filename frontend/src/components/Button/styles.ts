import styled, { css } from 'styled-components';

interface ContainerProps {
  variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export const Container = styled.button<ContainerProps>`
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 0;
  padding: 0 ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
  font-weight: 500;
  transition: filter 0.2s;

  ${props => {
    const variants = {
      primary: css`
        background: ${props.theme.colors.primary};
      `,
      secondary: css`
        background: ${props.theme.colors.secondary};
      `,
      success: css`
        background: ${props.theme.colors.success};
      `,
      error: css`
        background: ${props.theme.colors.error};
      `,
      warning: css`
        background: ${props.theme.colors.warning};
      `,
    };

    return variants[props.variant];
  }}

  &:hover {
    filter: brightness(0.9);
  }
`; 