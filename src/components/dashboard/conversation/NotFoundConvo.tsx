import { AlertTriangle, Clock, Home, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const NotFoundConvo = () => {
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          handleAutoRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAutoRedirect = () => {
    // Navigate to dashboard or previous page
    router.back();
    console.log("Auto-redirecting to dashboard...");
    // window.location.href = '/dashboard'; // or use your router
  };

  const handleManualRestart = () => {
    // Manual restart action
    router.push("/dashboard");
    console.log("Manual restart clicked");
    // window.location.href = '/dashboard'; // or use your router
  };

  const handleGoHome = () => {
    // Navigate to home page
    router.push("/");
    console.log("Navigate to home page");
    // window.location.href = '/'; // or use your router
  };
  return (
    <div className="min-h-screen bg-transparent from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Error Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>

          {/* Error Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Questions
          </h2>

          {/* Error Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            We're having trouble loading the assessment questions right now.
            This could be due to a temporary connection issue or system
            maintenance.
          </p>

          {/* What to do next */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">
              What you can do:
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 text-left">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                Check your internet connection
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                Restart the assessment from the dashboard
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                Try refreshing your browser
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                Contact support if the issue persists
              </li>
            </ul>
          </div>

          {/* Countdown Section */}
          {!isRedirecting ? (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6 border border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Automatically redirecting in{" "}
                  <span className="font-bold text-blue-600">{countdown}</span>{" "}
                  seconds
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">
                  Redirecting you now...
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleManualRestart}
              className="flex-1 bg-primary from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <RotateCcw className="inline-block w-4 h-4 mr-2" />
              Restart Assessment
            </button>

            <button
              onClick={handleGoHome}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              <Home className="inline-block w-4 h-4 mr-2" />
              Go Home
            </button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <p className="text-sm text-gray-600">
              💡 <strong>Need help?</strong> Our support team is available 24/7
              to assist you with any technical issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
