"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import TextField from "../../add-movie/fields/TextField";
import TextAreaField from "./TextAreaField";
import ToggleField from "./ToggleField";
import ImageUploadField from "./ImageUploadField";
import { updateGenre, getGenreById } from "@/services/genre";
import { ArrowLeft, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Genre name must be at least 2 characters"),
  slug: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

type GenreFormData = z.infer<typeof schema>;

interface Genre {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  isActive: boolean;
}

export default function EditGenreForm() {
  const router = useRouter();
  const params = useParams();
  const genreId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genre, setGenre] = useState<Genre | null>(null);

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

  // Fetch genre data
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        setIsLoading(true);
        const data = await getGenreById(genreId);
        setGenre(data);

        // Set form values
        form.reset({
          name: data.name,
          slug: data.slug || "",
          image: data.image || "",
          description: data.description || "",
          isActive: data.isActive,
        });
      } catch (error: any) {
        toast.error(error.message || "Failed to load genre");
        router.push("/dashboard/admin/genres");
      } finally {
        setIsLoading(false);
      }
    };

    if (genreId) {
      fetchGenre();
    }
  }, [genreId, router]);

  // Auto-generate slug from name
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name && !value.slug) {
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

      await updateGenre(genreId, submitData);
      toast.success("Genre updated successfully!");

      // Redirect
      setTimeout(() => {
        router.push("/dashboard/admin/genres");
      }, 500);
    } catch (error: any) {
      toast.error(error.message || "Failed to update genre");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading genre...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Genres
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Genre</h1>
            <p className="text-gray-600 mt-2">{genre?.name}</p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="text-xl">Update Genre Information</CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Info Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-black rounded" />
                    Basic Information
                  </h3>

                  <div className="space-y-4">
                    <TextField
                      control={form.control}
                      name="name"
                      label="Genre Name"
                      placeholder="e.g., Action, Drama, Comedy"
                    />

                    <TextField
                      control={form.control}
                      name="slug"
                      label="URL Slug"
                      placeholder="auto-generated from name"
                    />
                  </div>
                </div>

                {/* Media Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-black rounded" />
                    Media
                  </h3>

                  <ImageUploadField
                    control={form.control}
                    name="image"
                    label="Genre Cover Image"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    ✓ Leave empty to keep current image
                  </p>
                </div>

                {/* Description Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-black rounded" />
                    Details
                  </h3>

                  <TextAreaField
                    control={form.control}
                    name="description"
                    label="Description (Optional)"
                    placeholder="Add a description about this genre..."
                    rows={4}
                  />
                </div>

                {/* Settings Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-black rounded" />
                    Status
                  </h3>

                  <ToggleField
                    control={form.control}
                    name="isActive"
                    label="Active"
                    description="Enable or disable this genre in your library"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    className="flex-1 bg-black text-white hover:bg-gray-800 h-11"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-11"
                    onClick={() => router.push("/dashboard/admin/genres")}
                    disabled={isSubmitting}
                  >
                    Cancel
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
