"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import SwitchField from "./fields/SwitchField";
import MultiInputField from "./fields/MultiInputField";
import GenreSelectField from "./fields/GenreSelectField";

import ImageUploadField from "@/components/utils/ImageUploadField";

import { toast } from "sonner";
import { addMovie } from "@/services/movies";

const schema = z.object({
  title: z.string().min(2),
  description: z.string(),
  releaseYear: z.coerce.number(),
  director: z.string(),

  streamingLink: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), "Must be a valid URL"),

  price: z.coerce.number(),
  isPremium: z.boolean(),

  cast: z.array(z.string()),
  subtitles: z.array(z.string()),
  awards: z.array(z.string()),

  language: z.string(),
  duration: z.coerce.number(),
  ageRating: z.string(),
  country: z.string(),

  trailerLink: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), "Must be a valid URL"),

  thumbnail: z.string().url(),
  banner: z.string().url(),

  budget: z.coerce.number(),
  boxOffice: z.coerce.number(),
  status: z.string(),
  rating: z.coerce.number(),
  genreIds: z.array(z.string()).min(1, "Select at least one genre"),
});

export default function AddMovieForm({ genres }: any) {
  const [uploading, setUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      releaseYear: 2024,
      director: "",
      streamingLink: "",
      price: 0,
      isPremium: false,

      cast: [],
      subtitles: [],
      awards: [],

      language: "",
      duration: 0,
      ageRating: "",
      country: "",

      trailerLink: "",
      thumbnail: "",
      banner: "",

      budget: 0,
      boxOffice: 0,
      status: "released",
      rating: 0,
      genreIds: [],
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await addMovie(data);
      toast.success("Movie Added!");
      form.reset();
    } catch (error) {
      toast.error("Failed to add movie");
    }
  };

  const isLoading = form.formState.isSubmitting || uploading;

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Add Movie</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset
                disabled={isLoading}
                className="space-y-6"
              >
                {/* Images */}
                <div className="flex items-start justify-between gap-4">
                  <ImageUploadField
                    control={form.control}
                    name="thumbnail"
                    label="Thumbnail"
                    setUploading={setUploading}
                  />
                  <ImageUploadField
                    control={form.control}
                    name="banner"
                    label="Banner"
                    setUploading={setUploading}
                  />
                </div>

                {/* Basic Info */}
                <TextField control={form.control} name="title" label="Title" />
                <TextField control={form.control} name="director" label="Director" />

                <GenreSelectField
                  control={form.control}
                  name="genreIds"
                  label="Genres"
                  options={genres}
                />

                <TextField control={form.control} name="language" label="Language" />
                <TextField control={form.control} name="country" label="Country" />

                {/* Numbers */}
                <NumberField control={form.control} name="releaseYear" label="Release Year" />
                <NumberField control={form.control} name="duration" label="Duration (min)" />
                <NumberField control={form.control} name="price" label="Price" />
                <NumberField control={form.control} name="rating" label="Rating" />

                {/* Links */}
                <TextField
                  control={form.control}
                  name="streamingLink"
                  label="Streaming Link"
                />
                <TextField
                  control={form.control}
                  name="trailerLink"
                  label="Trailer Link"
                />

                {/* Arrays */}
                <MultiInputField control={form.control} name="cast" label="Cast" />
                <MultiInputField control={form.control} name="subtitles" label="Subtitles" />
                <MultiInputField control={form.control} name="awards" label="Awards" />

                {/* Switch */}
                <SwitchField
                  control={form.control}
                  name="isPremium"
                  label="Premium"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}

                  {form.formState.isSubmitting
                    ? "Saving..."
                    : uploading
                    ? "Uploading..."
                    : "Create Movie"}
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}