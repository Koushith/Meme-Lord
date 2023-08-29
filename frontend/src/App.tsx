import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { Outlet, useLocation } from "react-router-dom";
import { SideBar, TopBar } from "./components";
import { styled } from "styled-components";

const AppContainer = styled.div`
  .main {
    display: flex;
    gap: 2rem;
    padding: 1rem;
    .sidebar {
      @media screen and (max-width: 1100px) {
        display: none; /* Hide .main on mobile and tablet views */
      }
    }
  }

  .main-content {
    width: 100%;
    margin-top: 1rem;
    margin-left: 100px;

    @media screen and (max-width: 1300px) {
      margin: 0;
    }
  }
`;

function App() {
  const { pathname } = useLocation();

  return (
    <AppContainer>
      <div className="top-nav">
        <TopBar />
      </div>

      <div className="main">
        <div
          className={`sidebar hidden sm:block md:block ${
            pathname === "/auth" ? "hidden" : ""
          }`}
        >
          <SideBar />
        </div>
        <div className="main-content ">
          <Outlet />
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
