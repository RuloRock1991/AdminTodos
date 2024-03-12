"use client"

import { todo } from "@prisma/client"
import styles from "./TodoItem.module.css"
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { startTransition, useOptimistic } from "react";
import { onToggleTodo } from '../actions/todo-actions';

interface Props {
    todo: todo,
    toogleTodo: (id: string, complete: boolean) => Promise<todo | void>
    //TODO ACCIONES QUE QUIERO LLAMAR
}

export const TodoItem = ({ todo, toogleTodo }: Props) => {
    const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo, (state, newCompleteValue: boolean) => ({
        ...state, complete: newCompleteValue
    }));

    const toggleTodo = async () => {
        try {
            startTransition(()=> toggleTodoOptimistic(!todoOptimistic.complete) );
            await onToggleTodo(todoOptimistic.id, !todoOptimistic.complete);
        } catch (error) {
            startTransition(()=> toggleTodoOptimistic(!todoOptimistic.complete) );
        }
    }

    return (
        <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                {/* <div onClick={() => toggleTodo(todo.id, !todo.complete)} className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-6 ${todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"}`}> */}
                <div onClick={toggleTodo} className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-6 ${todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"}`}>
                    {todoOptimistic.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
                </div>

                <div className="text-center sm:text-left">
                    {todoOptimistic.description}
                </div>
            </div>
        </div>
    )
}
