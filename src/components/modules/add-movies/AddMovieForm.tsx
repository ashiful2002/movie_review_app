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
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  releaseYear: z.coerce.number(),
  director: z.string().min(2),
  price: z.coerce.number().min(0),
  isPremium: z.boolean(),
  genreIds: z.array(z.string()).min(1, "Select at least one genre"),
  cast: z.array(z.string()),
  language: z.array(z.string()).min(1, "Select at least one language"),
  duration: z.coerce.number().min(1),
  country: z.string(),
  thumbnail: z.string().url(),
  banner: z.string().url(),
  subtitles: z.array(z.string()),
  awards: z.array(z.string()),
  status: z.enum(["UPCOMING", "NOW_SHOWING", "RELEASED", "ARCHIVED"]),
  imdbRating: z.coerce.number().min(0).max(10),
  averageRating: z.coerce.number().min(0).max(5),
  isFeatured: z.boolean(),
  trailerLink: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), "Must be a valid URL"),

  budget: z.coerce.number().min(0).optional(),
});

export default function AddMovieForm({ genres }: any) {
  const [uploading, setUploading] = useState(false);

  const subtitleOptions = [
    { id: "English", name: "English" },
    { id: "Spanish", name: "Spanish" },
    { id: "French", name: "French" },
    { id: "German", name: "German" },
    { id: "Italian", name: "Italian" },
  ];
  const languageOptions = [
    { id: "English", name: "English" },
    { id: "Spanish", name: "Spanish" },
    { id: "French", name: "French" },
    { id: "Hindi", name: "Hindi" },
    { id: "Japanese", name: "Japanese" },
    { id: "Korean", name: "Korean" },
  ];
  const statusOptions = [
    { id: "UPCOMING", name: "Upcoming" },
    { id: "NOW_SHOWING", name: "Now Showing" },
    { id: "RELEASED", name: "Released" },
    { id: "ARCHIVED", name: "Archived" },
  ];
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      releaseYear: new Date().getFullYear(),
      director: "",
      price: 0,
      isPremium: false,
      genreIds: [],
      cast: [],
      language: [],
      duration: 120,
      country: "",
      thumbnail: "",
      banner: "",
      subtitles: [],
      awards: [],

      trailerLink: "",
      status: "UPCOMING",
      imdbRating: 0,
      averageRating: 0,
      isFeatured: false,
      budget: 0,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await addMovie(data);
      toast.success("Movie Added!", { position: "top-center" });
      form.reset();
    } catch (error) {
      toast.error("Failed to add movie", { position: "top-center" });
    }
  };

  const isLoading = form.formState.isSubmitting || uploading;

  return (
    <div className="flex justify-center p-6 ">
      <Card className="w-full max-w-3xl    ">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Add New Movie</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-3xl border"
            >
              <fieldset disabled={isLoading} className="space-y-6 max-w-3xl">
                <div className="flex items-start justify-between gap-5">
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

                <TextField
                  control={form.control}
                  name="title"
                  label="Movie Title"
                  placeholder="Enter the movie title"
                />
                <TextField
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="Movie description"
                />
                <TextField
                  control={form.control}
                  name="director"
                  label="Director Name"
                  placeholder="Enter the director's name"
                />
                <div className="flex items-start justify-between gap-4">
                  <MultiInputField
                    control={form.control}
                    name="cast"
                    label="Main Characters (Cast)"
                  />

                  <MultiInputField
                    control={form.control}
                    name="awards"
                    label="Awards"
                  />
                </div>

                <GenreSelectField
                  control={form.control}
                  name="genreIds"
                  label="Genres"
                  options={genres}
                />
                <GenreSelectField
                  control={form.control}
                  name="subtitles"
                  label="Subtitles"
                  options={subtitleOptions}
                />
                <GenreSelectField
                  control={form.control}
                  name="language"
                  label="Languages"
                  options={languageOptions}
                />
                {/* <GenreSelectField
                  control={form.control}
                  name="status"
                  label="Status"
                  options={statusOptions}
                /> */}
                <TextField
                  className="max-w-md"
                  control={form.control}
                  name="country"
                  label="Country"
                />
                <div className="flex flex-wrap gap-5">
                  {/* Numbers */}
                  <NumberField
                    control={form.control}
                    name="releaseYear"
                    label="Release Year"
                    placeholder="e.g. 2024"
                  />
                  <NumberField
                    control={form.control}
                    name="duration"
                    label="Duration (min)"
                    placeholder="e.g. 120"
                  />

                  <NumberField
                    control={form.control}
                    name="averageRating"
                    label="Rating"
                    placeholder="e.g. 8.5"
                  />
                  <NumberField
                    control={form.control}
                    name="imdbRating"
                    label="IMDb Rating"
                    placeholder="8.5"
                  />
                </div>

                {/* Links */}
                {/* <TextField
                  control={form.control}
                  name="streamingLink"
                  label="Streaming Link"
                /> */}
                <TextField
                  control={form.control}
                  name="trailerLink"
                  label="Trailer Link"
                />

                {/* <SwitchField
                  control={form.control}
                  name="isPremium"
                  label="Premium"
                /> */}
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}

                  {form.formState.isSubmitting
                    ? "Saving..."
                    : uploading
                    ? "Uploading..."
                    : "Create New Movie"}
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
