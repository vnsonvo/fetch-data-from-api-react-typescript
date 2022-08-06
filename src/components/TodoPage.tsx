import "./TodoPage.css";
import { Link, useParams } from "react-router-dom";
import { TodoType } from "../types/Todo.types";

type Props = {
  todos: TodoType[];
};

// path /details/:id
const TodoPage: React.FC<Props> = ({ todos }) => {
  type Param = {
    id: string | undefined;
  };
  const { id } = useParams<Param>();
  const todo = todos[Number(id) - 1];
  return (
    <main className="details">
      <h1>Details Page</h1>
      <p>
        <Link to="/">Visit Homepage</Link>
      </p>
      <article>
        {todo && (
          <>
            <div>
              <b>Status: </b>
              <span>{todo.completed ? "Completed" : "Not Completed"}</span>
            </div>
            <div>
              <b>ID: </b>
              <span>{todo.id}</span>
            </div>
            <div>
              <b>Title: </b>
              <span>{todo.title}</span>
            </div>
            <div>
              <b>UserID: </b>
              <span>{todo.userId}</span>
            </div>
          </>
        )}
        {!todo && (
          <>
            <h2>Todo Not Found</h2>
          </>
        )}
      </article>
    </main>
  );
};

export default TodoPage;
