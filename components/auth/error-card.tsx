import { Header } from "@/components/auth/header";
import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

export const ErrorCard = () => {
  return (
    <Card className="w-[350px] lg:w-[400px] md:w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong" />
      </CardHeader>
      <div className="w-full flex justify-center items-center">
        <TriangleAlert className="text-destructive" />
      </div>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
