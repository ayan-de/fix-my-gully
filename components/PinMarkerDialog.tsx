"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type PinMarkerDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (label: string) => void;
};

export default function PinMarkerDialog({
  open,
  onClose,
  onSave,
}: PinMarkerDialogProps) {
  const [label, setLabel] = useState("");

  const handleSave = () => {
    onSave(label);
    setLabel("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fix it...</DialogTitle>
        </DialogHeader>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="E.g., Garbage dumped here"
        />
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
