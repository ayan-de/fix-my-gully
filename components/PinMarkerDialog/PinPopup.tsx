"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PinMarkerForm } from "@/components/PinMarkerDialog/PinMarkerForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface PinPopupProps {
  children?: React.ReactNode;
  asChild?: boolean;
  open: boolean;
  onClose: () => void;
  onSave: (label: string, previewUrl: string | null) => void;
  coords?: { lat: number; lng: number } | null;
}

export default function PinPopup({
  children,
  asChild = false,
  open,
  onClose,
  onSave,
  coords,
}: PinPopupProps) {
  const [label, setLabel] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // const handleSave = () => {
  //   onSave(label, previewUrl);
  //   setLabel("");
  //   setSelectedFile(null);
  //   setPreviewUrl(null);
  // };

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleSave = () => {
    onSave(label, previewUrl);
    setLabel("");
    setPreviewUrl(null);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild={false}></DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <PinMarkerForm
          label={label}
          setLabel={setLabel}
          setSelectedFile={setSelectedFile}
          latitude={coords?.lat}
          longitude={coords?.lng}
          previewUrl={previewUrl}
        />
        <DialogFooter>
          <Button onClick={handleSave}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
