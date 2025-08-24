"use client";
import { ArrowRightToLine } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function CTA() {
  const router = useRouter();
  return (
    <section className="py-20 bg-transparent border-t-2 border-b-2 border-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold  mb-6">
          Ready to Discover Your Perfect Academic Path?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Join thousands of Nigerian students who have found their ideal
          programs with our AI-powered advisory system.
        </p>
        <Button
          onClick={() => router.push("/auth/signup")}
          variant="outline"
          className="cursor-pointer"
        >
          Get Started
          <ArrowRightToLine className="inline-block w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}

export default CTA;
