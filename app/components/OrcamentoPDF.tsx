import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
})

export const OrcamentoPDF = ({ orcamento }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Orçamento #{orcamento.id}</Text>
        <Text style={styles.text}>Data: {new Date(orcamento.data).toLocaleDateString()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Produtos:</Text>
        {orcamento.produtos.map((p) => (
          <Text key={p.id} style={styles.text}>
            {p.produto.nome} - Quantidade: {p.quantidade} - Preço: R$ {calcularPrecoProduto(p)}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Complementos:</Text>
        {orcamento.complementos.map((c) => (
          <Text key={c.id} style={styles.text}>
            {c.complemento.nome} - Quantidade: {c.quantidade} - Preço: R$ {c.complemento.preco * c.quantidade}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Total: R$ {calcularTotal(orcamento)}</Text>
      </View>
    </Page>
  </Document>
)

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

