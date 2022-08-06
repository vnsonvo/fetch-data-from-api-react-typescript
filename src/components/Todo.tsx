import { TodoType } from "../types/Todo.types";
import { Link } from "react-router-dom";

type Props = {
  todo: TodoType;
};

const Todo: React.FC<Props> = ({ todo }) => {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.userId}</td>
      <td>{todo.title}</td>
      <td>
        <Link to={`/details/${todo.id}`}>
          <p>View Details</p>
        </Link>
      </td>
    </tr>
  );
};

export default Todo;
