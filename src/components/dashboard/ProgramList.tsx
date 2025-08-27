"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePrograms } from "@/queries/dashboard.queries";
import { BookOpen, GraduationCap, Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const ProgramList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: programsData, isLoading, error } = usePrograms(currentPage, 5);
  
  const programs = programsData?.items || [];
  const pagination = programsData || {};

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl shadow-xs border p-8 hover:shadow-md transition-all duration-300">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Programs</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-lg text-muted-foreground">Loading programs...</div>
        </div>
      </div>
    );
  }

  if (error || !programs) {
    return (
      <div className="bg-card rounded-2xl shadow-xs border p-8 hover:shadow-md transition-all duration-300">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Programs</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-lg text-destructive">Failed to load programs</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-xs border p-8 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Programs ({Array.isArray(programs) ? programs.length : 0})
        </h2>
      </div>
      
      {!Array.isArray(programs) || programs.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No programs found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first program above to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(programs) && programs.map((program, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">{program.program_name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Degree</p>
                        <p className="font-semibold text-gray-900">{program.degree_type}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Mode</p>
                        <p className="font-semibold text-gray-900">{program.study_mode}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mr-3">
                        <Tag className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Field</p>
                        <p className="font-semibold text-gray-900">{program.field}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Page {pagination.pageNumber} of {pagination.totalPages} ({pagination.totalCount} total)
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!pagination.hasPreviousPage}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};