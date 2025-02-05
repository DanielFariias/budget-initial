import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const prisma = new PrismaClient()

async function getOrcamentos() {
  return await prisma.orcamento.findMany({
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
  })
}

export default async function OrcamentosPage() {
  const orcamentos = await getOrcamentos()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orçamentos</h1>
      <Link href="/orcamentos/novo">
        <Button>Novo Orçamento</Button>
      </Link>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Produtos</TableHead>
            <TableHead>Complementos</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orcamentos.map((orcamento) => (
            <TableRow key={orcamento.id}>
              <TableCell>{orcamento.id}</TableCell>
              <TableCell>{new Date(orcamento.data).toLocaleDateString()}</TableCell>
              <TableCell>
                {orcamento.produtos.map((p) => (
                  <div key={p.id}>
                    {p.produto.nome} (x{p.quantidade})
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {orcamento.complementos.map((c) => (
                  <div key={c.id}>
                    {c.complemento.nome} (x{c.quantidade})
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Link href={`/orcamentos/${orcamento.id}`}>
                  <Button variant="outline" className="mr-2">
                    Ver Detalhes
                  </Button>
                </Link>
                <Button variant="destructive">Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

