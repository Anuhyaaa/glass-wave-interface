import { Search, UserCheck, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description: "Find technicians by location, service type, and availability. View profiles, ratings, and reviews.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: UserCheck,
    title: "Choose Your Technician",
    description: "Compare verified professionals, check their specialties, and read customer reviews.",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Schedule a convenient time slot and provide details about your repair needs.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: CheckCircle,
    title: "Get It Fixed",
    description: "Meet your technician at the scheduled time and get your problem solved professionally.",
    color: "from-orange-400 to-orange-600"
  }
];

const HowItWorks = () => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How <span className="gradient-text">TechFinder</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your repairs done in just a few simple steps. It's that easy!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="relative text-center group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-4 z-0" />
                )}

                {/* Step Content */}
                <div className="relative z-10 glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass-card rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied customers who trust TechFinder for their repair needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-primary rounded-lg font-semibold hover:scale-105 transition-transform">
                Find Technicians
              </button>
              <button className="px-8 py-3 glass-card rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Become a Technician
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;