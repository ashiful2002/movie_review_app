import { Card, CardContent } from "@/components/ui/card";
import { Film, Globe, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 z-0" />
        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-500">
            Redefining Movie Reviews
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            MMDB is the ultimate destination for cinephiles. We bring you the most accurate ratings, 
            insightful reviews, and a community of movie lovers from around the globe.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              To create a transparent, engaging, and comprehensive platform where every movie 
              finds its audience and every viewer finds their next favorite film.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Film className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Authentic Reviews</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We believe in real opinions from real people. Our review system ensures 
                  authenticity and helps you make the best watch decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                  <Globe className="w-10 h-10 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Community</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Join thousands of movie enthusiasts worldwide. Discuss, rate, and 
                  share your passion for cinema with a community that cares.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Award className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Curated Excellence</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our advanced RAG-powered AI and expert editors curate the best 
                  lists, recommendations, and hidden gems just for you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5 rounded-3xl mx-4 mb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary/10">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h4 className="text-4xl md:text-5xl font-black text-primary">10K+</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-center">Movies Listed</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h4 className="text-4xl md:text-5xl font-black text-yellow-500">50K+</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-center">Active Users</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h4 className="text-4xl md:text-5xl font-black text-blue-500">2M+</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-center">Reviews Written</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h4 className="text-4xl md:text-5xl font-black text-green-500">99%</h4>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-center">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
