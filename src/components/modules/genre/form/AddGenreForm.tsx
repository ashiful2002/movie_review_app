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
import TextField from "../../add-movie/fields/TextField";
import TextAreaField from "./TextAreaField";
import ToggleField from "./ToggleField";
import ImageUploadField from "./ImageUploadField";
import { addGenre } from "@/services/genre";
import { ArrowLeft, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Genre name must be at least 2 characters"),
  slug: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
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

  // Auto-generate slug from name
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
      // Remove empty fields
      const submitData = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== "")
      );

      await addGenre(submitData);
      toast.success("Genre created successfully!");

      // Reset and redirect
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
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2  mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Genres
          </button>

          <div>
            <h1 className="text-3xl font-bold ">Add New Genre</h1>
            <p className=" mt-2">
              Create a new genre for your content library
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="  border-b">
            <CardTitle className="text-xl">Genre Information</CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Info Section */}
                <div>
                  <h3 className="text-lg font-semibold  mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 " />
                    Basic Information
                  </h3>

                  <div className="space-y-4">
                    <TextField
                      control={form.control}
                      name="name"
                      label="Genre Name"
                      placeholder="e.g., Action, Drama, Comedy"
                    />

                    {/* <TextField
                      control={form.control}
                      name="slug"
                      label="URL Slug (Auto-generated)"
                      placeholder="auto-generated from name"
                      disabled
                    /> */}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold  mb-4 flex items-center gap-2">
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
                    type="submit"
                    className="flex-1 h-11"
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

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-11"
                    onClick={() => {
                      form.reset();
                      router.push("/dashboard/genres");
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> The URL slug will be automatically generated
            from the genre name. You can edit it if needed.
          </p>
        </div>
      </div>
    </div>
  );
}
