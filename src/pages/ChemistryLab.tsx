
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Clock, BookOpen } from "lucide-react";

const ChemistryLab = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const experiments = [
    {
      id: "acid-base",
      title: "Acid-Base Titration", 
      description: "Determine unknown concentration using titration methods",
      duration: "30 mins",
      difficulty: "Intermediate",
      objectives: ["Understand titration process", "Calculate molarity", "Identify endpoint"],
      tools: ["Virtual burette", "pH meter", "Indicator solutions"]
    },
    {
      id: "reactions",
      title: "Chemical Reactions",
      description: "Explore different types of chemical reactions and products",
      duration: "25 mins",
      difficulty: "Beginner", 
      objectives: ["Classify reactions", "Balance equations", "Predict products"],
      tools: ["Reaction simulator", "Molecular viewer", "Equation balancer"]
    },
    {
      id: "equilibrium",
      title: "Chemical Equilibrium",
      description: "Study equilibrium principles and Le Chatelier's principle",
      duration: "35 mins",
      difficulty: "Advanced",
      objectives: ["Understand equilibrium", "Apply Le Chatelier's principle", "Calculate Kc"],
      tools: ["Equilibrium simulator", "Concentration tracker", "Temperature control"]
    },
    {
      id: "spectroscopy",
      title: "UV-Vis Spectroscopy",
      description: "Analyze compounds using absorption spectroscopy",
      duration: "28 mins",
      difficulty: "Advanced",
      objectives: ["Understand absorption", "Create calibration curves", "Identify compounds"],
      tools: ["Virtual spectrometer", "Sample preparation", "Data analysis tools"]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800"; 
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Labs
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chemistry Lab</h1>
                <p className="text-sm text-gray-600">Interactive Chemistry Experiments</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experiments List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Experiments</h2>
              <p className="text-gray-600">Select an experiment to begin your chemistry exploration</p>
            </div>

            <div className="grid gap-6">
              {experiments.map((experiment) => (
                <Card 
                  key={experiment.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                    selectedExperiment?.id === experiment.id ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                  }`}
                  onClick={() => setSelectedExperiment(experiment)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-900 mb-2">
                          {experiment.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {experiment.description}
                        </CardDescription>
                      </div>
                      <Link to={`/experiment/chemistry/${experiment.id}`}>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Badge className={getDifficultyColor(experiment.difficulty)}>
                        {experiment.difficulty}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {experiment.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {experiment.objectives.length} objectives
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experiment Details */}
          <div className="lg:col-span-1">
            {selectedExperiment ? (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    {selectedExperiment.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(selectedExperiment.difficulty)}>
                      {selectedExperiment.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedExperiment.duration}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives</h4>
                    <ul className="space-y-1">
                      {selectedExperiment.objectives.map((objective, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Virtual Tools</h4>
                    <ul className="space-y-1">
                      {selectedExperiment.tools.map((tool, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to={`/experiment/chemistry/${selectedExperiment.id}`} className="block">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Play className="w-4 h-4 mr-2" />
                      Start Experiment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Select an Experiment
                  </h3>
                  <p className="text-gray-600">
                    Choose an experiment from the list to view details and objectives
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemistryLab;
