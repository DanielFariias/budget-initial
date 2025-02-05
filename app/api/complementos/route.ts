import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, preco } = body;

  const complemento = await prisma.complemento.create({
    data: {
      nome,
      preco,
    },
  });

  return NextResponse.json(complemento);
}

export async function GET() {
  const complementos = await prisma.complemento.findMany();
  return NextResponse.json(complementos);
}
