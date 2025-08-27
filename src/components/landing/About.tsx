import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Globe } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            About AcademiAi
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Empowering Nigerian students with AI-driven academic guidance to make 
            informed decisions about their educational journey and career paths.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
            <p className="text-base mb-4">
              To democratize access to quality academic advising in Nigeria by leveraging 
              artificial intelligence to provide personalized, data-driven guidance that 
              helps students discover their ideal academic paths.
            </p>
            <p className="text-base">
              We believe every student deserves access to comprehensive academic guidance, 
              regardless of their institution's resources or geographical location.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Vision</h3>
            <p className="text-base mb-4">
              To become the leading platform for academic guidance in Nigeria, 
              transforming how students make educational decisions and ultimately 
              improving academic outcomes across the nation.
            </p>
            <p className="text-base">
              We envision a future where every Nigerian student has the tools and 
              insights needed to pursue their academic and career aspirations with confidence.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">Precision</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Accurate recommendations based on comprehensive data analysis and machine learning algorithms.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">Empathy</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Understanding each student's unique circumstances, aspirations, and challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">Innovation</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Continuously improving our AI technology to provide better insights and recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium">Impact</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Creating positive change in Nigerian higher education through accessible technology.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-background border rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Why We Built AcademiAi</h3>
            <p className="text-base">
              After observing the challenges faced by countless Nigerian students in making 
              informed academic decisions, we recognized the urgent need for a scalable, 
              intelligent solution. AcademiAi represents our commitment to bridging the 
              gap between student aspirations and academic opportunities through the power 
              of artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}