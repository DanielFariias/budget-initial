import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number.parseInt(params.id);

  const orcamento = await prisma.orcamento.findUnique({
    where: { id },
    include: {
      produtos: {
        include: {
          produto: {
            include: {
              variantes: true,
            },
          },
        },
      },
      complementos: {
        include: {
          complemento: true,
        },
      },
    },
  });

  if (!orcamento) {
    return NextResponse.json(
      { error: "Orçamento não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(orcamento);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { produtos, complementos } = body;

  const orcamento = await prisma.orcamento.create({
    data: {
      produtos: {
        create: produtos.map((produto: any) => ({
          produtoId: produto.id,
          quantidade: produto.quantidade,
        })),
      },
      complementos: {
        create: complementos.map((complemento: any) => ({
          complementoId: complemento.id,
          quantidade: complemento.quantidade,
        })),
      },
    },
  });

  return NextResponse.json(orcamento);
}
