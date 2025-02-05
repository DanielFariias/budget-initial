import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const prisma = new PrismaClient()

async function getComplementos() {
  return await prisma.complemento.findMany()
}

export default async function ComplementosPage() {
  const complementos = await getComplementos()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Complementos</h1>
      <Link href="/complementos/novo">
        <Button>Novo Complemento</Button>
      </Link>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complementos.map((complemento) => (
            <TableRow key={complemento.id}>
              <TableCell>{complemento.nome}</TableCell>
              <TableCell>R$ {complemento.preco.toFixed(2)}</TableCell>
              <TableCell>
                <Link href={`/complementos/${complemento.id}`}>
                  <Button variant="outline" className="mr-2">
                    Editar
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

