import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { boolean, object, string } from 'yup';

export async function GET(request: Request) {
    //localhost:3000/api/todos?take=2&skip=2
    const { searchParams } = new URL(request.url)
    const take = +(searchParams.get('take') ?? "10");
    const skip = +(searchParams.get('skip') ?? "0");
    if (isNaN(take)) {
        return NextResponse.json(
            { message: "TAKE tiene que ser un numero" },
            { status: 400 }
        )
    }

    if (isNaN(skip)) {
        return NextResponse.json(
            { message: "SKIP tiene que ser un numero" },
            { status: 400 }
        )
    }

    const todos = await prisma.todo.findMany({
        skip: skip,
        take: take
    });

    return NextResponse.json(todos);
}

//Configuracion para POST
const postSchema = object({
    description: string().required(),
    complete: boolean().optional().default(false)
})

export async function POST(request: Request) {
    try {
        const body = await postSchema.validate(await request.json());
        const todo = await prisma.todo.create({ data: body });

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            error,
            { status: 400 }
        )
    }
}

export async function DELETE(request: Request) {
    try {
        await prisma.todo.deleteMany({
            where: { complete: true }
        });

        return NextResponse.json({
            method: "DELETE"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Deletion not implemented"
        })
    }
}