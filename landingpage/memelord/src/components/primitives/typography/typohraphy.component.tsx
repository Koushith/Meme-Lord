import React from "react";
import styled, { css } from "styled-components";

interface TypographyProps {
  size?: number;
  bold?: boolean;
  bolder?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface HeadingProps extends TypographyProps {}

const Typography = styled.p<TypographyProps>`
  font-family: "DM Sans", sans-serif;
  font-size: ${({ size }) => (size ? size : 1.6)}rem;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: 500;
    `}
  ${({ bolder }) =>
    bolder &&
    css`
      font-weight: 700;
      font-size: 2rem !important;
    `}
`;

const StyledHeading = styled.h1<HeadingProps>`
  font-family: "Silkscreen", cursive;
  font-size: ${({ size }) => (size ? size : 3.2)}rem;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: 500;
    `}
  ${({ bolder }) =>
    bolder &&
    css`
      font-weight: 700;
    `}
`;

const Paragraph: React.FC<TypographyProps> = ({
  size,
  bold,
  bolder,
  className,
  children,
}) => {
  return (
    <Typography className={className} size={size} bold={bold} bolder={bolder}>
      {children}
    </Typography>
  );
};

const Heading: React.FC<HeadingProps> = ({
  size,
  bold,
  bolder,
  className,
  children,
}) => {
  return (
    <StyledHeading
      className={className}
      size={size}
      bold={bold}
      bolder={bolder}
    >
      {children}
    </StyledHeading>
  );
};

export { Paragraph, Heading };
