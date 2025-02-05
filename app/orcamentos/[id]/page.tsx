"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { OrcamentoPDF } from "../../components/OrcamentoPDF"

export default function DetalhesOrcamentoPage() {
  const { id } = useParams()
  const [orcamento, setOrcamento] = useState(null)

  useEffect(() => {
    fetch(`/api/orcamentos/${id}`)
      .then((res) => res.json())
      .then((data) => setOrcamento(data))
  }, [id])

  if (!orcamento) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalhes do Orçamento #{orcamento.id}</h1>
      <p>Data: {new Date(orcamento.data).toLocaleDateString()}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Produtos:</h2>
      <ul>
        {orcamento.produtos.map((p) => (
          <li key={p.id}>
            {p.produto.nome} - Quantidade: {p.quantidade} - Preço: R$ {calcularPrecoProduto(p)}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Complementos:</h2>
      <ul>
        {orcamento.complementos.map((c) => (
          <li key={c.id}>
            {c.complemento.nome} - Quantidade: {c.quantidade} - Preço: R$ {c.complemento.preco * c.quantidade}
          </li>
        ))}
      </ul>

      <p className="text-xl font-semibold mt-4">Total: R$ {calcularTotal(orcamento)}</p>

      <PDFDownloadLink
        document={<OrcamentoPDF orcamento={orcamento} />}
        fileName={`orcamento_${orcamento.id}.pdf`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block mt-4"
      >
        {({ blob, url, loading, error }) => (loading ? "Gerando PDF..." : "Baixar PDF")}
      </PDFDownloadLink>
    </div>
  )
}

function calcularPrecoProduto(produtoOrcamento) {
  const { produto, quantidade } = produtoOrcamento
  const varianteAplicavel = produto.variantes
    .filter((v) => v.quantidade <= quantidade)
    .sort((a, b) => b.quantidade - a.quantidade)[0]

  const precoUnitario = varianteAplicavel ? varianteAplicavel.preco : produto.precoBase
  return precoUnitario * quantidade
}

function calcularTotal(orcamento) {
  const totalProdutos = orcamento.produtos.reduce((total, p) => total + calcularPrecoProduto(p), 0)
  const totalComplementos = orcamento.complementos.reduce((total, c) => total + c.complemento.preco * c.quantidade, 0)
  return totalProdutos + totalComplementos
}

