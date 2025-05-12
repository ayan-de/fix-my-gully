"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";

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
          <DialogTitle>
            <Image
              src="/marker.png"
              width={50}
              height={50}
              alt="Logo picure"
              style={{ display: "block", margin: "0 auto" }}
            />
          </DialogTitle>
          <DialogDescription>
            Provide a label and upload a picture for the location your marking.
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="E.g., Garbage dumped here"
        />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
