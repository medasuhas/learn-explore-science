
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, RotateCcw, Play, Pause } from "lucide-react";
import { toast } from "sonner";

const ExperimentView = () => {
  const { subject, experimentId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [experimentData, setExperimentData] = useState([]);
  const [results, setResults] = useState(null);

  // Sample experiment data based on subject and ID
  const experiments = {
    physics: {
      pendulum: {
        title: "Simple Pendulum",
        steps: [
          "Set up the pendulum with desired length",
          "Choose initial angle (10-30 degrees)",
          "Release the pendulum and start timing",
          "Record 10 complete oscillations",
          "Calculate the period and frequency",
          "Analyze results and compare with theory"
        ],
        theory: "A simple pendulum consists of a mass suspended from a string. The period T depends on length L and gravitational acceleration g: T = 2π√(L/g)",
        simulation: "pendulum"
      },
      "ohms-law": {
        title: "Ohm's Law Circuit", 
        steps: [
          "Build a simple circuit with resistor",
          "Connect voltmeter and ammeter",
          "Set initial voltage value",
          "Measure current through resistor", 
          "Vary voltage and record readings",
          "Plot V-I graph and calculate resistance"
        ],
        theory: "Ohm's law states that voltage is proportional to current: V = IR, where R is resistance.",
        simulation: "circuit"
      }
    },
    chemistry: {
      "acid-base": {
        title: "Acid-Base Titration",
        steps: [
          "Prepare the acid solution in conical flask",
          "Fill burette with base solution",
          "Add indicator to acid solution",
          "Titrate slowly while swirling",
          "Record endpoint color change",
          "Calculate concentration from volume"
        ],
        theory: "Titration determines unknown concentration by neutralization reaction. At endpoint: moles acid = moles base",
        simulation: "titration"
      }
    },
    biology: {
      microscopy: {
        title: "Virtual Microscopy",
        steps: [
          "Select specimen slide",
          "Start with lowest magnification",
          "Focus using coarse adjustment",
          "Switch to higher magnification",
          "Use fine focus for clarity",
          "Identify and record structures"
        ],
        theory: "Microscopy allows observation of cellular structures. Resolution depends on wavelength of light used.",
        simulation: "microscope"
      }
    }
  };

  const experiment = experiments[subject]?.[experimentId];
  const progress = experiment ? (currentStep / experiment.steps.length) * 100 : 0;

  const handleStartExperiment = () => {
    setIsRunning(true);
    toast.success("Experiment started!");
    
    // Simulate data collection
    const interval = setInterval(() => {
      setExperimentData(prev => [...prev, {
        time: prev.length + 1,
        value: Math.random() * 100 + Math.sin(prev.length * 0.1) * 20
      }]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setResults({
        conclusion: "Experiment completed successfully!",
        observations: ["Clear pattern observed", "Data follows expected trend", "Minimal experimental error"],
        calculations: "Average value: 85.2 ± 3.1"
      });
      toast.success("Experiment completed!");
    }, 8000);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false); 
    setExperimentData([]);
    setResults(null);
    toast.info("Experiment reset");
  };

  const handleDownloadReport = () => {
    // Simulate report download
    toast.success("Lab report downloaded!");
  };

  if (!experiment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Experiment Not Found</h2>
            <Link to="/">
              <Button>Return to Labs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSubjectColor = (subject) => {
    switch(subject) {
      case "physics": return "blue";
      case "chemistry": return "orange";
      case "biology": return "green";
      default: return "gray";
    }
  };

  const color = getSubjectColor(subject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/lab/${subject}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {subject.charAt(0).toUpperCase() + subject.slice(1)} Lab
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{experiment.title}</h1>
                <p className="text-sm text-gray-600">Interactive Experiment</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={`bg-${color}-100 text-${color}-800`}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Experiment Area */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Experiment Progress</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={handleStartExperiment}
                      disabled={isRunning}
                      className={`bg-${color}-600 hover:bg-${color}-700`}
                    >
                      {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isRunning ? "Running..." : "Start"}
                    </Button>
                    <Button onClick={handleReset} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Progress value={progress} className="mt-2" />
                <p className="text-sm text-gray-600 mt-1">
                  Step {currentStep + 1} of {experiment.steps.length}
                </p>
              </CardHeader>
            </Card>

            {/* Virtual Simulation Area */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Virtual Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`h-64 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-lg flex items-center justify-center relative overflow-hidden`}>
                  {experiment.simulation === "pendulum" && (
                    <div className="relative">
                      <div className="w-2 h-32 bg-gray-800 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                      <div className={`w-8 h-8 bg-${color}-600 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 ${isRunning ? 'animate-pulse' : ''}`}></div>
                      {isRunning && <div className="absolute inset-0 border-2 border-dashed border-gray-400 rounded-full animate-spin"></div>}
                    </div>
                  )}
                  
                  {experiment.simulation === "circuit" && (
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-8 border-2 border-${color}-600 rounded`}></div>
                      <div className="w-16 h-1 bg-gray-600"></div>
                      <div className={`w-8 h-8 border-2 border-${color}-600 rounded-full`}></div>
                      <div className="w-16 h-1 bg-gray-600"></div>
                      <div className={`w-12 h-8 border-2 border-${color}-600 rounded`}></div>
                      {isRunning && <div className={`absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse`}></div>}
                    </div>
                  )}
                  
                  {experiment.simulation === "titration" && (
                    <div className="flex items-end space-x-4">
                      <div className={`w-16 h-32 border-2 border-${color}-600 rounded-b-lg relative`}>
                        <div className={`absolute bottom-0 w-full h-1/2 bg-${color}-300 rounded-b-lg ${isRunning ? 'animate-pulse' : ''}`}></div>
                      </div>
                      <div className={`w-12 h-24 border-2 border-${color}-600 rounded-b-full relative`}>
                        <div className={`absolute bottom-0 w-full h-3/4 bg-blue-300 rounded-b-full ${isRunning ? 'h-1/2' : ''} transition-all duration-1000`}></div>
                      </div>
                    </div>
                  )}
                  
                  {experiment.simulation === "microscope" && (
                    <div className="relative">
                      <div className={`w-32 h-32 border-4 border-${color}-600 rounded-full flex items-center justify-center`}>
                        <div className={`w-16 h-16 bg-gradient-to-r from-green-300 to-blue-300 rounded-full ${isRunning ? 'animate-spin' : ''}`}>
                          <div className="w-4 h-4 bg-purple-500 rounded-full m-2"></div>
                          <div className="w-3 h-3 bg-red-500 rounded-full ml-6 -mt-1"></div>
                        </div>
                      </div>
                      {isRunning && <div className="absolute -inset-4 border-2 border-dashed border-gray-400 rounded-full animate-pulse"></div>}
                    </div>
                  )}
                  
                  <div className="absolute top-2 left-2 text-sm text-gray-600">
                    {isRunning ? "Experiment in progress..." : "Ready to start"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Visualization */}
            {experimentData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-gray-50 rounded-lg p-4 relative">
                    <svg className="w-full h-full">
                      {experimentData.map((point, index) => (
                        <circle
                          key={index}
                          cx={`${(index / experimentData.length) * 100}%`}
                          cy={`${100 - (point.value / 120) * 100}%`}
                          r="2"
                          fill={`rgb(${color === 'blue' ? '59, 130, 246' : color === 'green' ? '34, 197, 94' : '249, 115, 22'})`}
                        />
                      ))}
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Data points collected: {experimentData.length}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="instructions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="theory">Theory</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Step-by-Step Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {experiment.steps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            index === currentStep
                              ? `bg-${color}-50 border-${color}-200`
                              : index < currentStep
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                index === currentStep
                                  ? `bg-${color}-500 text-white`
                                  : index < currentStep
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 space-x-2">
                      <Button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        variant="outline"
                        size="sm"
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(Math.min(experiment.steps.length - 1, currentStep + 1))}
                        disabled={currentStep === experiment.steps.length - 1}
                        size="sm"
                        className={`bg-${color}-600 hover:bg-${color}-700`}
                      >
                        Next
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="theory">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Theoretical Background</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {experiment.theory}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Experiment Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Conclusion</h4>
                          <p className="text-sm text-gray-700">{results.conclusion}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Observations</h4>
                          <ul className="space-y-1">
                            {results.observations.map((obs, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {obs}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Calculations</h4>
                          <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">
                            {results.calculations}
                          </p>
                        </div>

                        <Button onClick={handleDownloadReport} className="w-full mt-4">
                          <Download className="w-4 h-4 mr-2" />
                          Download Lab Report
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-8">
                        Complete the experiment to view results
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentView;
