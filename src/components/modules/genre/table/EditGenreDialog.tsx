"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Genre } from "../types";
 
interface EditGenreDialogProps {
  genre: Genre | null;
  onClose: () => void;
  onSave: (id: string, data: { name: string; isActive: boolean }) => Promise<void>;
}

export default function EditGenreDialog({
  genre,
  onClose,
  onSave,
}: EditGenreDialogProps) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Sync form fields whenever a new genre is opened for editing
  useEffect(() => {
    if (genre) {
      setName(genre.name);
      setIsActive(genre.isActive);
    }
  }, [genre]);

  const handleSave = async () => {
    if (!genre) return;
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      await onSave(genre.id, { name: name.trim(), isActive });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={!!genre} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Genre</DialogTitle>
          <DialogDescription>
            Update the details for &quot;{genre?.name}&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="genre-name">Name</Label>
            <Input
              id="genre-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Genre name"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="genre-active">Active</Label>
            <Switch
              id="genre-active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !name.trim()}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}