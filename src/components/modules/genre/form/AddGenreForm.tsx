"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import TextField from "../../add-movies/fields/TextField";

import ImageUploadField from "./ImageUploadField";
import { addGenre } from "@/services/genre";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(2, "Genre name must be at least 2 characters"),
  slug: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean(),
});

type GenreFormData = z.infer<typeof schema>;

export default function AddGenreForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GenreFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      image: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name && !form.getValues("slug")) {
        const generatedSlug = value.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        form.setValue("slug", generatedSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: GenreFormData) => {
    setIsSubmitting(true);
    try {
      const submitData: GenreFormData = {
        ...data,
        slug: data.slug || undefined,
        image: data.image || undefined,
        description: data.description || undefined,
      };

      await addGenre(submitData);
      toast.success("Genre created successfully!", { position: "top-center" });

      form.reset();
      setTimeout(() => {
        router.push("/dashboard/genres");
      }, 500);
    } catch (error: any) {
      toast.error(error.message || "Failed to create genre");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="  border-b">
            <CardTitle className="text-xl text-center">
              <div>
                <h1 className="text-3xl font-bold ">Add New Genre</h1>
                <p className=" mt-2">
                  Create a new genre for your content library
                </p>
              </div>{" "}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Info Section */}
                <div>
                  <div className="space-y-4">
                    <TextField
                      control={form.control}
                      name="name"
                      label="Genre Name"
                      placeholder="e.g., Action, Drama, Comedy"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-l g    mb-4 flex items-center">
                    <div className="w-1 h-6  rounded" />
                    Image
                  </h3>

                  <ImageUploadField
                    control={form.control}
                    name="image"
                    label="Genre Cover Image"
                  />

                  <p className="text-xs  mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Recommended size: 500x500px, Max 5MB
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-11 cursor-pointer"
                    onClick={() => {
                      form.reset();
                      router.push("/dashboard/genres");
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-11 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      "Create Genre"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
