import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app">
      <Outlet />
      <footer>
        <p>&copy; Son Vo 2022</p>
      </footer>
    </div>
  );
};

export default Layout;
