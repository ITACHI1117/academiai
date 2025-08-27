"use client";
import { ProgramForm } from "@/components/dashboard/ProgramForm";
import { ProgramList } from "@/components/dashboard/ProgramList";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="h-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Program Management
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create and manage academic programs with ease
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProgramForm />
          <ProgramList />
        </div>
      </div>
    </div>
  );
}