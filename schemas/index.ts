import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message:"Email is required"
    }),
    password:z.string().min(6,{
        message:"Mimimum 6 characters required"
    }),
    name: z.string().min(1,{
        message:"Name is required"
    }),
})

export const MarkerSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  label: z.string().optional(),
  imageUrl: z.string().url().optional(),
});