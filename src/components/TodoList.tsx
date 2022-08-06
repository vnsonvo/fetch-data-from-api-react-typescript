import "./TodoList.css";
import { useEffect, useState } from "react";
import { TodoType } from "../types/Todo.types";
import Todo from "./Todo";
import TodoGroup from "./TodoGroup";
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
  }, [viewType, todos]);

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
                ID
                {idSort === undefined ? (
                  ""
                ) : idSort ? (
                  <FcNumericalSorting12 className="icon" />
                ) : (
                  <FcNumericalSorting21 className="icon" />
                )}
              </th>
              <th>User ID</th>
              <th onClick={() => handleSortByTitle()} className="title">
                Title
                {titleSort === undefined ? (
                  ""
                ) : titleSort ? (
                  <FcAlphabeticalSortingZa className="icon" />
                ) : (
                  <FcAlphabeticalSortingAz className="icon" />
                )}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoNormal.map((todo: TodoType) => (
              <Todo todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
      {viewType && todoGroup.length && (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th className="titleGroup">Title</th>
            </tr>
          </thead>
          <tbody>
            {todoGroup.map((todoGroupByUserID: TodoType[], indexN: number) => (
              <TodoGroup
                key={indexN}
                index={indexN}
                todoGroupByUserID={todoGroupByUserID}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TodoList;
