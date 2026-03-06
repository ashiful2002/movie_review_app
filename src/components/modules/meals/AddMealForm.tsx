"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addMeal } from "@/services/meals";
import { toast } from "sonner";
const demoCategories = [
  { id: "259abcd5-c531-45ad-9af4-ca7a1774c4f4", name: "Fast Food" },
];

const dietaryOptions = ["VEG", "NON_VEG", "VEGAN", "GLUTEN_FREE"];

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  image: z.string().url("Must be a valid image URL"),
  isAvailable: z.boolean(),
  categoryId: z.string().min(1, "Category is required"),
  dietary: z.array(z.string()).optional(),
});

export default function AddMealForm({ categoriesParams }: any) {
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const categories =
    categoriesParams?.length > 0 ? categoriesParams : demoCategories;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      isAvailable: true,
      categoryId: categories[0].id,
      dietary: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted Meal:", values);

    // Later replace with real API call
    /*
    await fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    */
    try {
      const result = await addMeal(values);
      console.log("this is res error", result);

      if (result.success) {
        toast.success(result.message, { position: "top-right" });
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDietaryChange = (value: string) => {
    let updated: string[] = [];

    if (selectedDietary.includes(value)) {
      updated = selectedDietary.filter((item) => item !== value);
    } else {
      updated = [...selectedDietary, value];
    }

    setSelectedDietary(updated);
    form.setValue("dietary", updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Meal</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Meal name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Meal description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="150" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image URL */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.webp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dietary */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Dietary</label>
                <div className="flex gap-6 flex-wrap">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedDietary.includes(option)}
                        onCheckedChange={() => handleDietaryChange(option)}
                      />
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>Available</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full text-base font-semibold">
                Create Meal
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
