"use client";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  MapPin,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Recommend = () => {
  //   const [selectedFilter, setSelectedFilter] = useState("all");

  const router = useRouter();

  const recommendations = [
    {
      programName: "Master of Science in Computer Science",
      university: "University of Lagos",
      reason:
        "This program is the most direct and relevant option given the student's background in Computer Science and their expressed interests in Software engineering, Web development, Mobile app development, and Artificial intelligence. A First-Class undergraduate degree demonstrates the necessary academic aptitude for success in this demanding program. The broad nature of the Computer Science Master's allows for specialization in the student's areas of interest, and opens up various career paths in software development, AI research, and related fields. This provides excellent career prospects both within Nigeria and internationally.",
      matchScore: 95,
      duration: "1-2 years",
      type: "Full-time",
    },
    {
      programName: "Master of Information Technology",
      university: "University of Lagos",
      reason:
        "This program offers a slightly broader focus than the Computer Science Master's, encompassing aspects of software engineering, web development, and potentially aspects of cybersecurity and blockchain, aligning with several of the student's interests. A First-Class degree strongly suggests the academic ability to handle the coursework. This program still provides strong career prospects in various IT sectors and makes the student adaptable to a wider range of IT job roles, potentially making them a more versatile candidate.",
      matchScore: 88,
      duration: "1-2 years",
      type: "Full-time",
    },
    {
      programName: "Master of Laws in Cyberlaw",
      university: "University of Lagos",
      reason:
        "Considering the student's interest in Cybersecurity, a Master of Laws in Cyberlaw, IF offered as a full-time option (the profile mentions a part time option which might not be suitable for a recent graduate), would provide a unique and specialized skillset highly sought after in the increasingly important field of cybersecurity. The combination of a Computer Science background and a law degree specializing in cyberlaw offers exceptional career prospects, both in the public and private sectors. However, this is only a strong recommendation *if* a full-time option exists and is available.",
      matchScore: 82,
      duration: "1-2 years",
      type: "Full-time",
      note: "Subject to full-time availability",
    },
  ];

  const handleFeedback = () => {
    // This would navigate to feedback page
    router.push("/dashboard/rating");
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-purple-600 bg-purple-50 border-purple-200";
  };
  return (
    <div className="min-h-screen bg-transparent pt-10 md:pt-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Your Personalized Recommendations
            </h1>
            <p className="text-lg text-gray-600">
              Based on your profile, here are the best postgraduate programs for
              you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-green-400 to-green-600  p-10 text-white mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">
                {recommendations.length}
              </div>
              <div className="text-blue-100">Programs Found</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {Math.max(...recommendations.map((r) => r.matchScore))}%
              </div>
              <div className="text-blue-100">Best Match</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1</div>
              <div className="text-blue-100">University</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filter by match score:</span>
              <div className="flex space-x-2">
                {['all', '90+', '80+'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter === 'all' ? 'All Programs' : `${filter}% Match`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        {/* Recommendations List */}
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {rec.programName}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {rec.university}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {rec.duration}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {rec.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div
                      className={`px-4 py-2 rounded-full border ${getMatchScoreColor(
                        rec.matchScore
                      )}`}
                    >
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span className="font-bold">
                          {rec.matchScore}% Match
                        </span>
                      </div>
                    </div>
                    {rec.note && (
                      <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        {rec.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                    Why This Program is Perfect for You
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{rec.reason}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <button className="flex-1 bg-primary from-green-300 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                    Learn More About Program
                    <ArrowRight className="inline-block w-4 h-4 ml-2" />
                  </button>
                  <div className="flex space-x-2">
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <ThumbsUp className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <ThumbsDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              How do these recommendations look?
            </h3>
            <p className="text-gray-600 mb-6">
              Your feedback helps us improve our AI recommendations for future
              students. Let us know what you think about these suggestions.
            </p>
            <button
              onClick={handleFeedback}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MessageSquare className="inline-block w-5 h-5 mr-2" />
              Provide Feedback
            </button>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
            Save Recommendations
          </button>*/}
          <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
            Go To Dashboard
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
