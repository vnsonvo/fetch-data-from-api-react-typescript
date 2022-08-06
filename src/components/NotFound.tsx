import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <h1>Page Not Found</h1>
      <p>
        <Link to="/">Visit Homepage</Link>
      </p>
    </main>
  );
};

export default NotFound;
