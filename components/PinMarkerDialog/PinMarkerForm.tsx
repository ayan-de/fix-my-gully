"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MarkerSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { addMarker } from "@/actions/add-Marker";
import { Label } from "@/components/ui/label";

interface PinMarkerFormProps {
  label: string;
  setLabel: (val: string) => void;
  setSelectedFile: (file: File | null) => void;
  latitude?: number;
  longitude?: number;
  previewUrl: string | null;
}

export const PinMarkerForm = ({
  label,
  setLabel,
  setSelectedFile,
  latitude,
  longitude,
  previewUrl,
}: PinMarkerFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof MarkerSchema>>({
    resolver: zodResolver(MarkerSchema),
    defaultValues: {
      label: "",
      // imageUrl: "",
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
    },
  });

  useEffect(() => {
    form.setValue("latitude", latitude ?? 0);
    form.setValue("longitude", longitude ?? 0);
    form.setValue("label", label);
  }, [latitude, longitude, label, form]);

  const onSubmit = async (values: z.infer<typeof MarkerSchema>) => {
    const result = await addMarker({
      latitude: values.latitude,
      longitude: values.longitude,
      label: values.label ?? "",
      // imageUrl: previewUrl ?? "", // You can change this to actual image URL if uploaded
    });

    if (result.error) {
      console.log(result.error);
    } else {
      console.log(result.success);
      form.reset();
      setLabel("");
      setSelectedFile(null);
    }
  };

  return (
    <CardWrapper
      headerLabel="Put Marker on the Map"
      backButtonHref=""
      backButtonLabel=""
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Open Trash"
                      {...field}
                      value={label}
                      onChange={(e) => {
                        field.onChange(e);
                        setLabel(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>latitude</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>longitude</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* image upload here */}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
