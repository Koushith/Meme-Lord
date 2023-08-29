import { styled } from "styled-components";

export const FAQContainer = styled.section`
  .faq-lists {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6rem;
    gap: 10rem;
  }

  .question {
    color: #ffffff;
    font-size: 2rem;
    letter-spacing: -0.025em;
    line-height: 1.5;
  }

  .answer {
    margin-top: 1rem;
    font-size: 1.6rem;
    letter-spacing: 0em;
    line-height: 1.5;
  }
`;
