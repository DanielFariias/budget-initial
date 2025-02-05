-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "precoBase" REAL NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Variante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "preco" REAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "Variante_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Complemento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OrcamentoProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orcamentoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "OrcamentoProduto_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrcamentoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrcamentoComplemento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orcamentoId" INTEGER NOT NULL,
    "complementoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "OrcamentoComplemento_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrcamentoComplemento_complementoId_fkey" FOREIGN KEY ("complementoId") REFERENCES "Complemento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
