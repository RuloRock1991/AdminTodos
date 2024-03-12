import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            {description: "Piedra del alma", complete: true},
            {description: "Piedra de la realidad"},
            {description: "Piedra del tiempo", complete: true},
            {description: "Piedra del espacio"},
            {description: "Piedra del poder", complete: true},
            {description: "Piedra de la mente"}
        ]
    });

    return NextResponse.json({
        message: "Seed executed"
    })
}