import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default function Solution() {
  return (
    <section id="solution" className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Solving Academic Advisory Challenges
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Traditional academic advising faces significant limitations. AcademiAi 
            provides an innovative solution that makes quality guidance accessible to all.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">The Problem</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Limited access to qualified academic advisors in Nigerian institutions</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">High advisor-to-student ratios leading to inadequate guidance</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Inconsistent advice quality and lack of personalization</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Students making uninformed decisions about their academic future</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Solution</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">AI-powered personalized recommendations available 24/7</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Comprehensive database of Nigerian university programs</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Data-driven insights for informed decision making</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Scalable solution reaching students nationwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">Accessible to All</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Breaking down barriers to quality academic guidance, making it available to every student regardless of location or institution.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">Improved Outcomes</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Students make better-informed decisions leading to higher satisfaction and success rates in their chosen programs.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">Instant Guidance</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                No more waiting for advisor appointments. Get immediate, personalized recommendations whenever you need them.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/auth/signup">
              Experience the Solution
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}