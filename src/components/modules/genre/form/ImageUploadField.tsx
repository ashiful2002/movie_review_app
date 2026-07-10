"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
    control: any;
    name: string;
    label: string;
}

export default function ImageUploadField({
    control,
    name,
    label,
}: ImageUploadFieldProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent, onChange: any) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files[0]) {
            handleFileSelect(files[0], onChange);
        }
    };

    const handleFileSelect = (file: File, onChange: any) => {
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
            onChange(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>

                    {preview ? (
                        <div className="relative  w-40 h-40 p-2  rounded-lg overflow-hidden border-2 border-gray-300  ">
                            <img
                                src={preview}
                                alt="Preview"
                                className="rounded-lg  object-contain"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(null);
                                    field.onChange("");
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, field.onChange)}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragging
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        handleFileSelect(e.target.files[0], field.onChange);
                                    }
                                }}
                                className="hidden"
                                id={`file-input-${name}`}
                            />

                            <label htmlFor={`file-input-${name}`} className="cursor-pointer">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="p-3 bg-gray-100 rounded-full">
                                        <Upload className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    )}
                </div>
            )}
        />
    );
}
