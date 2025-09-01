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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <Header isFixed={true} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Build Your
              <span className="text-primary block mt-2">Link in Bio</span>
              <span className="text-secondary">Effortlessly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create a stunning, customizable page that showcases all your important links.
              Perfect for social media profiles, business cards, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Start Building Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 h-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full transition-all duration-200"
              >
                <Link href="#features">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>100% Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect link-in-bio page
              and grow your audience effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-foreground/80">Active Users</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-foreground/80">Links Created</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">1M+</div>
              <div className="text-primary-foreground/80">Total Clicks</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
              <div className="text-primary-foreground/80">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators, businesses, and influencers who trust us
            to manage their online presence effectively.
          </p>

          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-8"
          >
            <Link href="/dashboard">Get Started Now</Link>
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Free forever plan available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Linkify</h3>
            <p className="text-gray-400 mb-6">
              The ultimate link-in-bio solution for creators and businesses.
            </p>
            <div className="text-gray-400 text-sm">
              © 2025 Linkify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}