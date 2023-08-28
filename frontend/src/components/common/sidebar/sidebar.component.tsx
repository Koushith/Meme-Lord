import { Link } from "react-router-dom";
import { SideBarContainer } from "./sidebar.styles";
import { HomeIcon, User2, Settings } from "lucide-react";

export const SideBar = () => {
  return (
    <SideBarContainer>
      <ul>
        <li>
          <HomeIcon className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/">Home</Link>
        </li>
        <li>
          <User2 className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/users">All Users</Link>
        </li>
        <li>
          <Settings className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/profile">Profile</Link>
        </li>{" "}
      </ul>
    </SideBarContainer>
  );
};
