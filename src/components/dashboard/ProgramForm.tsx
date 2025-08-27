"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProgram } from "@/queries/dashboard.queries";
import { ProgramData } from "@/types/feedback";
import { useToast } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

export const ProgramForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProgramData>();
  const createProgramMutation = useCreateProgram();
  const { toast } = useToast();

  const onSubmit = async (data: ProgramData) => {
    try {
      await createProgramMutation.mutateAsync(data);
      toast({
        title: "Program created successfully",
        variant: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error creating program",
        variant: "destructive",
        description: "Please try again",
      });
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-xs border p-8 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
          <Plus className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Create New Program</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="programName" className="text-sm font-semibold text-foreground mb-2 block">
            Program Name
          </Label>
          <Input
            id="programName"
            {...register("programName", { required: "Program name is required" })}
            placeholder="Enter program name"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
          {errors.programName && (
            <p className="text-sm text-red-600 mt-2">{errors.programName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="degreeType" className="text-sm font-semibold text-foreground mb-2 block">
            Degree Type
          </Label>
          <Input
            id="degreeType"
            {...register("degreeType", { required: "Degree type is required" })}
            placeholder="e.g., Masters, PhD, Bachelor"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
          {errors.degreeType && (
            <p className="text-sm text-red-600 mt-2">{errors.degreeType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="studyMode" className="text-sm font-semibold text-foreground mb-2 block">
            Study Mode
          </Label>
          <Input
            id="studyMode"
            {...register("studyMode", { required: "Study mode is required" })}
            placeholder="e.g., Full-time, Part-time, Online"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
          {errors.studyMode && (
            <p className="text-sm text-red-600 mt-2">{errors.studyMode.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="field" className="text-sm font-semibold text-foreground mb-2 block">
            Field
          </Label>
          <Input
            id="field"
            {...register("field", { required: "Field is required" })}
            placeholder="e.g., Computer Science, Engineering"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
          {errors.field && (
            <p className="text-sm text-red-600 mt-2">{errors.field.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 py-4 px-6 rounded-xl font-semibold transition-all duration-200"
          disabled={createProgramMutation.isPending}
        >
          {createProgramMutation.isPending ? "Creating..." : "Create Program"}
        </Button>
      </form>
    </div>
  );
};