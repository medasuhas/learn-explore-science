
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Beaker, Atom, Microscope, ArrowRight } from "lucide-react";

const Index = () => {
  const subjects = [
    {
      id: "physics",
      title: "Physics Lab",
      description: "Explore mechanics, electricity, and wave phenomena through interactive simulations",
      icon: Atom,
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      experiments: 8
    },
    {
      id: "chemistry",
      title: "Chemistry Lab", 
      description: "Conduct safe chemical reactions and learn molecular interactions",
      icon: Beaker,
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
      experiments: 12
    },
    {
      id: "biology",
      title: "Biology Lab",
      description: "Study living organisms and biological processes in detail",
      icon: Microscope,
      color: "bg-gradient-to-br from-green-500 to-green-700", 
      experiments: 10
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Virtual Lab</h1>
                <p className="text-sm text-gray-600">Interactive Science Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to the Virtual Lab
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore the world of science through interactive experiments. 
            Conduct safe, engaging experiments in Physics, Chemistry, and Biology 
            from anywhere, anytime.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <Card 
                  key={subject.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`h-32 ${subject.color} flex items-center justify-center relative overflow-hidden`}>
                    <Icon className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                      {subject.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {subject.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-gray-500">
                        {subject.experiments} experiments available
                      </span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    
                    <Link to={`/lab/${subject.id}`}>
                      <Button 
                        className="w-full group/btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-3 text-lg font-medium"
                      >
                        Start Experiments
                        <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Virtual Lab?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Atom className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Safe Environment</h4>
              <p className="text-gray-600">Conduct experiments without any safety risks or material costs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h4>
              <p className="text-gray-600">Hands-on experiments with real-time feedback and visual results</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Beaker className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Reports</h4>
              <p className="text-gray-600">Generate detailed lab reports with observations and analysis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
