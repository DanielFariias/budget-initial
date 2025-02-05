"use client";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { revalidatePath } from "next/cache";

const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  precoBase: z.number().min(0, "Preço base deve ser maior ou igual a zero"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  variantes: z.array(
    z.object({
      quantidade: z.number().min(1, "Quantidade deve ser maior que zero"),
      preco: z.number().min(0, "Preço deve ser maior ou igual a zero"),
    })
  ),
});

type ProdutoFormValues = z.infer<typeof produtoSchema>;

export default function NovoProdutoPage() {
  const router = useRouter();
  const form = useForm<ProdutoFormValues>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: "",
      precoBase: 0,
      descricao: "",
      variantes: [{ quantidade: 1, preco: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variantes",
  });

  const onSubmit = async (data: ProdutoFormValues) => {
    const response = await fetch("/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.replace(`/produtos?t=${new Date().getTime()}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="precoBase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço Base</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2 className="text-xl font-semibold mb-2">Variantes</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="flex space-x-2 mb-2">
              <FormField
                control={form.control}
                name={`variantes.${index}.quantidade`}
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
              <FormField
                control={form.control}
                name={`variantes.${index}.preco`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                        placeholder="Preço"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remover
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ quantidade: 1, preco: 0 })}
          >
            Adicionar Variante
          </Button>
        </div>
        <Button type="submit">Salvar Produto</Button>
      </form>
    </Form>
  );
}
