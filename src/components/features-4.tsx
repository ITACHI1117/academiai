import {
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";

export default function FeaturesFour() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            Why Choose Our AI Advisory System?
          </h2>
          <p>
            Bridge the gap in accessible, personalized academic advising with
            cutting-edge AI technology designed specifically for Nigerian
            students.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">
                Personalized Recommendations
              </h3>
            </div>
            <p className="text-sm">
              Get tailored suggestions that align perfectly with your academic
              profile and career goals.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">24/7 Availability</h3>
            </div>
            <p className="text-sm">
              Access academic guidance anytime, anywhere without waiting for
              advisor appointments.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Fingerprint className="size-4" />

              <h3 className="text-sm font-medium">Data-Driven Insights</h3>
            </div>
            <p className="text-sm">
              Make informed decisions based on comprehensive analysis of
              academic programs and career outcomes.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pencil className="size-4" />

              <h3 className="text-sm font-medium">Continuous Learning</h3>
            </div>
            <p className="text-sm">
              Our AI system improves over time, providing increasingly accurate
              recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
