"use client";
import {
  ArrowLeft,
  GraduationCap,
  Home,
  MessageSquare,
  RefreshCw,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const handleGoHome = () => {
    // Navigate to home page
    router.push("/");
    console.log("Navigate to home page");
  };

  const handleGoBack = () => {
    // Go back to previous page
    router.back();
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Large 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* 404 Text */}
            <h1 className="text-5xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-600 opacity-20">
              404
            </h1>

            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Main Icon */}
                <div className="w-24 h-24 bg-gradient-to-r from-green-300 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <Search className="w-12 h-12 text-white" />
                </div>

                {/* Floating Academic Icons */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center animate-ping">
                  <MessageSquare className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off on its own
            academic journey. Don't worry though - we can help you find your way
            back to discovering your perfect program!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={handleGoHome}
            className=" cursor-pointer bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="inline-block w-5 h-5 mr-2" />
            Go Home
          </button>

          <button
            onClick={handleGoBack}
            className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="inline-block w-5 h-5 mr-2" />
            Go Back
          </button>

          {/* <button
            onClick={handleRefresh}
            className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            <RefreshCw className="inline-block w-5 h-5 mr-2" />
            Refresh
          </button> */}
        </div>

        {/* Helpful Suggestions */}
        {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What would you like to do instead?
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Start Assessment
              </h4>
              <p className="text-sm text-gray-600">
                Get personalized program recommendations
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Browse Programs
              </h4>
              <p className="text-sm text-gray-600">
                Explore available postgraduate programs
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Help Center</h4>
              <p className="text-sm text-gray-600">
                Find answers to common questions
              </p>
            </div>
          </div>
        </div> */}

        {/* Fun Academic Quote */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 text-white max-w-2xl mx-auto">
            <p className="text-lg italic mb-2">
              "The journey of a thousand miles begins with a single step... or
              in this case, the right academic program!"
            </p>
            <p className="text-blue-200 text-sm">- AcademiAI Team</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>Error Code: 404 | Page Not Found</p>
          <p className="mt-1">
            If you believe this is a mistake, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
