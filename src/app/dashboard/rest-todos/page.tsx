export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { TodosGrid } from '../../../todos/components/TodosGrid';
import { NewTodo } from '../../../todos/components/NewTodo';

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: "asc"
    }
  })
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}