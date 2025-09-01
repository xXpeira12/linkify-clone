import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Brush, ChartNoAxesCombined, CheckCircle, ChevronsUp, ShieldEllipsis, TabletSmartphone, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const mockFeatures = [
  {
    icon: <Brush className="w-8 h-8" />,
    title: "Customizable Links",
    description: "Easily customize your links with our intuitive editor."
  },
  {
    icon: <ChartNoAxesCombined className="w-8 h-8" />,
    title: "Analytics Dashboard",
    description: "Gain insights into your link performance with our analytics dashboard."
  },
  {
    icon: <TabletSmartphone className="w-8 h-8" />,
    title: "Mobile Optimization",
    description: "Ensure your links look great on any device with our mobile optimization tools."
  },
  {
    icon: <ChevronsUp className="w-8 h-8" />,
    title: "Link Management",
    description: "Effortlessly manage and organize your links with our powerful tools."
  },
  {
    icon: <ShieldEllipsis className="w-8 h-8" />,
    title: "Security Features",
    description: "Keep your links safe and secure with our advanced security features."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaborate with Team",
    description: "Work together with your team to manage links effectively."
  }
]

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div>
      {/* Header Section */}
      <Header isFixed={true} />

      {/* Intro Section */}
      {/* TODO : Design UI */}
      <section>
        <div className="text-center max-w-3xl mx-auto py-8">
          <h1 className="text-4xl font-bold">Welcome to Linkify Clone</h1>
          <p>Your go-to solution for link management.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              Start Building Free
              <ArrowRight className="w-5 h-5"/>
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            <Link href="#features">
              See How It Works
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      {/* TODO : Design UI */}
      <section id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold">Everything You Need</h2>
            <p className="text-sm text-muted-foreground">All the essential tools for link management in one place.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border-b">
                {feature.icon}
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* TODO : Design UI */}
      <section>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="text-sm text-muted-foreground">Join thousands of users managing their links effectively.</p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
        <div className="max-w-md mx-auto space-y-4 flex flex-col items-center">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 inline-block mr-2 text-green-500" />
            <span className="text-sm text-muted-foreground">Free to start</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 inline-block mr-2 text-green-500" />
            <span className="text-sm text-muted-foreground">No credit card required</span>
          </div>
        </div>
      </section>
    </div>
  );
}