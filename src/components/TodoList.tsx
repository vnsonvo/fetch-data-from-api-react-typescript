import { useEffect, useState } from "react";
import { TodoType } from "../types/Todo.types";
import Todo from "./Todo";
import { Link } from "react-router-dom";

type Props = {
  todos: TodoType[];
  viewType: boolean;
};

const TodoList: React.FC<Props> = ({ todos, viewType }) => {
  const [todoGroup, setTodoGroup] = useState<[TodoType[]]>([[]]);
  useEffect(() => {
    if (viewType) {
      const todoTemp: [TodoType[]] = [[]];
      todos.forEach((todo) => {
        const indexN = todo.userId - 1;
        if (todoTemp[indexN]) todoTemp[indexN].push(todo);
        else todoTemp[indexN] = [todo];
      });
      setTodoGroup(todoTemp);
    }
  }, [viewType]);

  return (
    <>
      {!viewType && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          {todos.map((todo: TodoType) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </table>
      )}
      {viewType && todoGroup.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {todoGroup.map((todoGroupByUserID: TodoType[], indexN: number) => (
              <tr key={indexN}>
                <td>{indexN + 1}</td>
                <td>
                  <ul>
                    {todoGroupByUserID.map((eachTodo) => (
                      <li key={eachTodo.id}>
                        <Link to={`/details/${eachTodo.id}`}>
                          {eachTodo.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TodoList;
