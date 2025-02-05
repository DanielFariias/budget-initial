import Link from "next/link";
import { HomeIcon, BoxIcon } from "@radix-ui/react-icons";

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <nav className="space-y-4">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <HomeIcon />
          <span>Início</span>
        </Link>
        <Link
          href="/produtos"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <BoxIcon />
          <span>Produtos</span>
        </Link>
        <Link
          href="/complementos"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <BoxIcon />
          <span>Complementos</span>
        </Link>
        <Link
          href="/orcamentos"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <BoxIcon />
          <span>Orçamentos</span>
        </Link>
      </nav>
    </div>
  );
}
