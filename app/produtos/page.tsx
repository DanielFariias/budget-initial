import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const prisma = new PrismaClient()

async function getProdutos() {
  return await prisma.produto.findMany({
    include: {
      variantes: true,
    },
  })
}

export default async function ProdutosPage() {
  const produtos = await getProdutos()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <Link href="/produtos/novo">
        <Button>Novo Produto</Button>
      </Link>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço Base</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Variantes</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos.map((produto) => (
            <TableRow key={produto.id}>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>R$ {produto.precoBase.toFixed(2)}</TableCell>
              <TableCell>{produto.descricao}</TableCell>
              <TableCell>
                {produto.variantes.map((variante) => (
                  <div key={variante.id}>
                    {variante.quantidade}+: R$ {variante.preco.toFixed(2)}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Link href={`/produtos/${produto.id}`}>
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

