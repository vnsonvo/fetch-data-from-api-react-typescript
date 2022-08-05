import { TodoType } from "../types/Todo.types";
import { Link } from "react-router-dom";

type Props = {
  todo: TodoType;
};

const Todo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="todo">
      <Link to={`/details/${todo.id}`}>
        <p>{todo.title}</p>
      </Link>
    </div>
  );
};

export default Todo;
