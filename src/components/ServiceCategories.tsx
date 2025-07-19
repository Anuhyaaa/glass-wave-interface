import { Monitor, Home, Car, Smartphone, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Computer Repair",
    icon: Monitor,
    description: "Laptop, desktop, and software issues",
    count: "150+ technicians",
    color: "from-blue-400 to-blue-600"
  },
  {
    name: "Home Appliances",
    icon: Home,
    description: "Refrigerator, washing machine, AC repair",
    count: "200+ technicians",
    color: "from-green-400 to-green-600"
  },
  {
    name: "Vehicle Repair",
    icon: Car,
    description: "Auto mechanics and diagnostics",
    count: "120+ technicians",
    color: "from-orange-400 to-orange-600"
  },
  {
    name: "Mobile Devices",
    icon: Smartphone,
    description: "Phone and tablet screen repairs",
    count: "80+ technicians",
    color: "from-purple-400 to-purple-600"
  },
  {
    name: "Plumbing",
    icon: Wrench,
    description: "Pipes, fixtures, and water systems",
    count: "90+ technicians",
    color: "from-cyan-400 to-cyan-600"
  },
  {
    name: "Electrical",
    icon: Zap,
    description: "Wiring, outlets, and electrical systems",
    count: "110+ technicians",
    color: "from-yellow-400 to-yellow-600"
  }
];

const ServiceCategories = () => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Choose Your <span className="gradient-text">Service Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse by category to find the right technician for your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground mb-3">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">
                    {category.count}
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
                    Browse →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;