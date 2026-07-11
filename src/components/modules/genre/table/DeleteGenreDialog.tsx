"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Genre } from "../types";
 
interface DeleteGenreDialogProps {
  genre: Genre | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteGenreDialog({
  genre,
  onClose,
  onConfirm,
}: DeleteGenreDialogProps) {
  return (
    <AlertDialog open={!!genre} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this genre?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete &quot;{genre?.name}&quot;. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}