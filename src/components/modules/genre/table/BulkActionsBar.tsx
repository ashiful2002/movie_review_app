"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface BulkActionsBarProps {
  selectedCount: number;
  onDeleteAll: () => Promise<void>;
}

export default function BulkActionsBar({
  selectedCount,
  onDeleteAll,
}: BulkActionsBarProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (selectedCount === 0) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDeleteAll();
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 right-6 px-6 py-4 rounded-lg shadow-lg flex items-center justify-between max-w-md bg-background border">
        <span className="font-medium">{selectedCount} selected</span>
        <Button
          variant="destructive"
          onClick={() => setOpen(true)}
          className="ml-2 cursor-pointer font-medium text-sm"
        >
          Delete All
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedCount} genre(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All selected genres will be
              permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}