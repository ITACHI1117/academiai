import React from "react";

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-white ">
            Simple steps to discover your ideal academic path
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="text-center relative">
            <div className="w-16 h-16 bg-primary  flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white  mb-3">
              Share Your Profile
            </h3>
            <p className="text-gray-600 dark:text-white ">
              Tell us about your academic background, interests, career goals,
              and preferred institutions.
            </p>
          </div>

          <div className="text-center relative">
            <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white  mb-3">
              AI Analysis
            </h3>
            <p className="text-gray-600 dark:text-white ">
              Our AI engine analyzes your profile using advanced algorithms and
              matches you with suitable programs.
            </p>
          </div>

          <div className="text-center relative">
            <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white  mb-3">
              Get Recommendations
            </h3>
            <p className="text-gray-600 dark:text-white ">
              Receive personalized program recommendations ranked by relevance
              and fit to your profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
