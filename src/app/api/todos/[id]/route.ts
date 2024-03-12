import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma';
import { boolean, object, string } from 'yup';
import { todo } from '@prisma/client';

interface Segments {
    params: {
        id: string
    }
}

const getTodo = async(id: string):Promise<todo | null> => {
    const result = await prisma.todo.findFirst({
        where: {
            id: id
        }
    });

    return result;
}

export async function GET(request: Request, { params }: Segments) {
    const result = await getTodo(params.id);

    if (!result) {
        return NextResponse.json(
            { message: `El siguiente id no fue encontrado: ${params.id}` },
            { status: 400 }
        )
    }

    return NextResponse.json(result);
}

//Configuracion para PUT
const putSchema = object({
    description: string().optional(),
    complete: boolean().optional()
})

export async function PUT(request: Request, { params }: Segments) {
    const result = await getTodo(params.id)

    if (!result) {
        return NextResponse.json(
            { message: `El siguiente id no fue encontrado: ${params.id}` },
            { status: 400 }
        )
    }

    try {
        const { complete, description, ...rest } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id: params.id },
            data: { complete, description }
        });

        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json(
            error,
            { status: 400 }
        );
    }
}