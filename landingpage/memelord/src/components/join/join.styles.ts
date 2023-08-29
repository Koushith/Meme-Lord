import { styled } from "styled-components";

export const JoinSectionContainer = styled.section`
  .heading {
    font-weight: 400;
    text-align: center;
  }

  .sub-heading {
    font-size: 16px;
    letter-spacing: 0em;
    line-height: 1.5;
    text-align: center;
    margin-top: 3rem;
    max-width: 48rem;
    margin: 3rem auto 3rem auto;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .button {
      border: none;
      cursor: pointer;
      padding: 15px 15px 15px 15px;
      border-radius: 10px;
      font-weight: 500;
      font-size: 16px;
      font-family: "DM Sans", sans-serif;
      font-style: normal;
      letter-spacing: 0em;
      line-height: 1em;
      text-align: center;
      background: rgb(101, 100, 219);
      color: rgb(13, 19, 23);
      z-index: 1;
    }

    .email {
      border: none;
      padding: 15px 15px 15px 15px;
      border-radius: 10px;
      font-size: 16px;
      font-family: "DM Sans", sans-serif;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0em;
      line-height: 1em;
      background: rgb(41, 59, 72);
      color: rgb(255, 255, 255);
      margin-right: 1rem;
    }
  }
`;
