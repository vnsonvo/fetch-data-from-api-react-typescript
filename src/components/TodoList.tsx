import { useEffect, useState } from "react";
import { TodoType } from "../types/Todo.types";
import Todo from "./Todo";
import { Link } from "react-router-dom";
import {
  FcNumericalSorting12,
  FcNumericalSorting21,
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from "react-icons/fc";

type Props = {
  todos: TodoType[];
  viewType: boolean;
};

const TodoList: React.FC<Props> = ({ todos, viewType }) => {
  const [todoGroup, setTodoGroup] = useState<[TodoType[]]>([[]]);
  const [todoNormal, setTodoNormal] = useState<TodoType[]>(todos);
  const [idSort, setIDSort] = useState<boolean | undefined>(true);
  const [titleSort, setTitleSort] = useState<boolean | undefined>();

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

  const handleSortByID = () => {
    if (!idSort) {
      setTodoNormal(todos);
    } else {
      const tempTodo: TodoType[] = [...todos].reverse();
      setTodoNormal(tempTodo);
    }
    if (idSort === undefined) {
      setIDSort(true);
    } else {
      setIDSort(!idSort);
    }
    setTitleSort(undefined);
  };

  const handleSortByTitle = () => {
    if (!titleSort && titleSort === false) {
      const tempTodo: TodoType[] = [...todos].sort((a, b) => {
        if (a.title > b.title) return -1;
        else if (a.title < b.title) return 1;
        return 0;
      });
      setTodoNormal(tempTodo);
    } else {
      const tempTodo: TodoType[] = [...todos].sort((a, b) => {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        return 0;
      });
      setTodoNormal(tempTodo);
    }
    if (titleSort === undefined) {
      setTitleSort(false);
    } else {
      setTitleSort(!titleSort);
    }
    setIDSort(undefined);
  };

  return (
    <>
      {!viewType && (
        <table>
          <thead>
            <tr>
              <th onClick={handleSortByID}>
                ID{" "}
                {idSort === undefined ? (
                  ""
                ) : idSort ? (
                  <FcNumericalSorting12 />
                ) : (
                  <FcNumericalSorting21 />
                )}
              </th>
              <th>User ID</th>
              <th onClick={() => handleSortByTitle()}>
                Title{" "}
                {titleSort === undefined ? (
                  ""
                ) : titleSort ? (
                  <FcAlphabeticalSortingAz />
                ) : (
                  <FcAlphabeticalSortingZa />
                )}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          {todoNormal.map((todo: TodoType) => (
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
