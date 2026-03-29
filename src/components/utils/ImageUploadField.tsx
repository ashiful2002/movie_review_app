"use client";

import { useState } from "react";
import Image from "next/image";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

export default function ImageUploadField({
  control,
  name,
  label,
  setUploading,
}: any) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const handleUpload = async (file: File, onChange: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onChange(data.data.url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // ✅ Preview
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);

                // ✅ Upload
                handleUpload(file, field.onChange);
              }}
            />
          </FormControl>

          {/* Preview */}
          {preview && (
            <div className="mt-3">
              <Image
                src={preview}
                alt="preview"
                width={200}
                height={120}
                className="rounded-md object-cover"
              />
            </div>
          )}

          {loading && (
            <p className="text-sm text-muted-foreground">Uploading...</p>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
