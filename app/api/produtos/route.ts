import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, precoBase, descricao, variantes } = body;

  const produto = await prisma.produto.create({
    data: {
      nome,
      precoBase,
      descricao,
      variantes: {
        create: variantes,
      },
    },
  });

  return NextResponse.json(produto);
}

export async function GET() {
  const produtos = await prisma.produto.findMany();
  return NextResponse.json(produtos);
}
