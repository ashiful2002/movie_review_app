"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { createReviews } from "@/services/reviews";

const ReviewModal = ({ movieId }: { movieId: string }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!rating) return toast.error("Please select a rating");
      if (!content.trim()) return toast.error("Review cannot be empty");

      setLoading(true);

      const payload = {
        movieId,
        rating,
        content,
        spoiler,
        tags: tags
          ? tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      await createReviews(payload);

      toast.success("Review submitted", { position: "top-center" });

      // reset
      setRating(0);
      setContent("");
      setTags("");
      setSpoiler(false);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="cursor-pointer">
          Write Review <Plus className="ml-1 w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        {/* ⭐ Rating (1–10) */}
        <div>
          <p className="text-sm font-medium mb-2">
            Rating: <span className="text-primary">{rating}/10</span>
          </p>

          <div className="flex flex-wrap gap-1">
            {[...Array(10)].map((_, i) => {
              const starValue = i + 1;
              return (
                <Star
                  key={i}
                  onClick={() => setRating(starValue)}
                  className={`w-5 h-5 cursor-pointer transition ${
                    starValue <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* ✍️ Content */}
        <Textarea
          placeholder="Write your honest review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-3"
        />

        {/* 🏷 Tags */}
        <Input
          placeholder="Tags (comma separated, e.g. amazing, slow, emotional)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-3"
        />

        {/* ⚠ Spoiler */}
        <label className="flex items-center gap-2 mt-3 text-sm">
          <input
            type="checkbox"
            checked={spoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
          />
          This review contains spoilers
        </label>

        {/* 🚀 Submit */}
        <Button
          className="mt-4 w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
