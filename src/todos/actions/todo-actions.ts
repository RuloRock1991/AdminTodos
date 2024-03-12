"use server";
import prisma from '@/lib/prisma';
import { todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const onToggleTodo = async(id:string, complete:boolean):Promise<todo> => {
    const todo = await prisma.todo.findFirst({
        where:{ id }
    });

    if ( !todo ){
        throw `Todo con id ${id} no encontrado`
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete: complete }
    });

    revalidatePath("/dashboard/server-actions");

    return updatedTodo;
}

export const addTodo = async( description:string ) => {
    try {
        const newTodo = await prisma.todo.create({ data: { description } });
        revalidatePath("/dashboard/server-actions");

        return newTodo
    } catch (error) {
        return {
            message: "Error al crear el todo"
        }
    }
}

export const onDeleteTodo = async():Promise<void> => {
    await prisma.todo.deleteMany({
        where: { complete: true }
    });
    revalidatePath("/dashboard/server-actions");
}