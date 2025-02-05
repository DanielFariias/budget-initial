"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const complementoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  preco: z.number().min(0, "Preço deve ser maior ou igual a zero"),
});

type ComplementoFormValues = z.infer<typeof complementoSchema>;

export default function NovoComplementoPage() {
  const router = useRouter();
  const form = useForm<ComplementoFormValues>({
    resolver: zodResolver(complementoSchema),
    defaultValues: {
      nome: "",
      preco: 0,
    },
  });

  const onSubmit = async (data: ComplementoFormValues) => {
    const response = await fetch("/api/complementos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.replace(`/complementos?t=${new Date().getTime()}`);
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
          name="preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
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
        <Button type="submit">Salvar Complemento</Button>
      </form>
    </Form>
  );
}
