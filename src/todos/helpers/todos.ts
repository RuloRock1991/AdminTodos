import { todo } from "@prisma/client";

const sleep = (seconds:number = 0):Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, seconds*1000);
    });
}

export const updateTodo = async (id: string, complete: boolean): Promise<todo> => {
    const body = { complete }

    const dbTodo = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resp => resp.json());

    // console.log({dbTodo});

    return dbTodo;
}

export const createTodo = async (description: string): Promise<todo> => {
    const body = { description }

    const dbTodo = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resp => resp.json());

    console.log({ dbTodo });

    return dbTodo;
}

export const deleteTodo = async () => {
    const dbTodo = await fetch("/api/todos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resp => resp.json());

    return dbTodo
}