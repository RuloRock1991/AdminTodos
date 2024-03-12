"use client"
import { todo } from "@prisma/client"
import { useRouter } from "next/navigation";
import { TodoItem } from ".."
import { onToggleTodo } from "../actions/todo-actions";
import * as todosApi from "../helpers/todos";

interface Props {
  todos?: todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter();

  // SIN SERVER ACTIONS
  // const toogleTodo = async (id: string, complete: boolean) => {
  //   const updateTodo = await todosApi.updateTodo(id, complete);

  //   router.refresh();
  // }

  // CON SERVER ACTIONS

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map(todoItem => (<TodoItem key={todoItem.id} todo={todoItem} toogleTodo={onToggleTodo} />))
      }
    </div>
  )
}
