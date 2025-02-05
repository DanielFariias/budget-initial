"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const orcamentoSchema = z.object({
  produtos: z.any(),
  complementos: z.any(),
});

type OrcamentoFormValues = z.infer<typeof orcamentoSchema>;

export default function NovoOrcamentoPage() {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [complementos, setComplementos] = useState([]);

  const form = useForm<OrcamentoFormValues>({
    resolver: zodResolver(orcamentoSchema),
    defaultValues: {
      produtos: [],
      complementos: [],
    },
  });

  const { fields: produtosFields, append: appendProduto } = useFieldArray({
    control: form.control,
    name: "produtos",
  });

  const { fields: complementosFields, append: appendComplemento } =
    useFieldArray({
      control: form.control,
      name: "complementos",
    });

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data));

    fetch("/api/complementos")
      .then((res) => res.json())
      .then((data) => setComplementos(data));
  }, []);

  const onSubmit = async (data: OrcamentoFormValues) => {
    console.log(data);
    const response = await fetch("/api/orcamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.replace(`/orcamentos?t=${new Date().getTime()}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Produtos</h2>
          {produtosFields.map((field, index) => (
            <div key={field.id} className="flex space-x-2 mb-2">
              <FormField
                control={form.control}
                name={`produtos.${index}.id`}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {produtos.map((produto) => (
                          <SelectItem
                            key={produto.id}
                            value={produto.id.toString()}
                          >
                            {produto.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`produtos.${index}.quantidade`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                        placeholder="Quantidade"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendProduto({ id: 0, quantidade: 1 })}
          >
            Adicionar Produto
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Complementos</h2>
          {complementosFields.map((field, index) => (
            <div key={field.id} className="flex space-x-2 mb-2">
              <FormField
                control={form.control}
                name={`complementos.${index}.id`}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um complemento" />
                      </SelectTrigger>
                      <SelectContent>
                        {complementos.map((complemento) => (
                          <SelectItem
                            key={complemento.id}
                            value={complemento.id.toString()}
                          >
                            {complemento.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`complementos.${index}.quantidade`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                        placeholder="Quantidade"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendComplemento({ id: 0, quantidade: 1 })}
          >
            Adicionar Complemento
          </Button>
        </div>

        <Button type="submit">Salvar Orçamento</Button>
      </form>
    </Form>
  );
}
