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
import { Star } from "lucide-react";
import { toast } from "sonner";

const ReviewModal = ({ mealId, orderId }: any) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const payload = {
      mealId,
      rating,
      comment,
    };

    console.log(payload);

    // await createReview(payload)

    toast.success("Review submitted successfully");
    setRating(0);
    setComment("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button className="cursor-pointer" size="sm">Leave Review</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>

        {/* Star Rating */}
        <div className="flex gap-2 my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer ${
                rating >= star ? "fill-yellow-400 text-yellow-400" : ""
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <Textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Submit Review
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;