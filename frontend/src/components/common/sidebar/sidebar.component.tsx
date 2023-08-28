import { Link } from "react-router-dom";
import { SideBarContainer } from "./sidebar.styles";
import { HomeIcon, User2, Settings } from "lucide-react";

export const SideBar = () => {
  return (
    <SideBarContainer>
      <ul>
        <li className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full justify-start">
          <HomeIcon className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/">Home</Link>
        </li>
        <li className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
          <User2 className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/users">All Users</Link>
        </li>
        <li className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start">
          <Settings className="h-[1.2rem] w-[1.2rem]" />{" "}
          <Link to="/profile">Profile</Link>
        </li>{" "}
      </ul>
    </SideBarContainer>
  );
};
