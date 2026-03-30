"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import TextField from "../../add-movie/fields/TextField";
import { addGenre } from "@/services/genre";

const schema = z.object({
  name: z.string().min(2, "Genre name must be at least 2 characters"),
});

export default function AddGenreForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await addGenre(data);
      toast.success("Genre Added!");

      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to add genre");
    }
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add New Genre</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextField
                control={form.control}
                name="name"
                label="Genre Name"
                placeholder="Enter genre name"
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Processing..." : "Create Genre"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
