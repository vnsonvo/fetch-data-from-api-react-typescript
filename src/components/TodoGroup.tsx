import { TodoType } from "../types/Todo.types";
import { Link } from "react-router-dom";

type Props = {
  index: number;
  todoGroupByUserID: TodoType[];
};

const TodoGroup: React.FC<Props> = ({ index, todoGroupByUserID }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <ul>
          {todoGroupByUserID.map((eachTodo) => (
            <li key={eachTodo.id}>
              <Link to={`/details/${eachTodo.id}`}>{eachTodo.title}</Link>
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default TodoGroup;
