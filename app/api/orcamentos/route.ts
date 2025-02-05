import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { produtos, complementos } = body;

  const orcamento = await prisma.orcamento.create({
    data: {
      produtos: {
        create: produtos.map((p) => ({
          produtoId: Number(p.id),
          quantidade: p.quantidade,
        })),
      },
      complementos: {
        create: complementos.map((c) => ({
          complementoId: Number(c.id),
          quantidade: c.quantidade,
        })),
      },
    },
    include: {
      produtos: {
        include: {
          produto: true,
        },
      },
      complementos: {
        include: {
          complemento: true,
        },
      },
    },
  });

  return NextResponse.json(orcamento);
}

export async function GET() {
  const produtos = await prisma.orcamento.findMany();
  return NextResponse.json(produtos);
}
