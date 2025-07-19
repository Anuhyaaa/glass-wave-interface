import { Search, MapPin, Wrench, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="relative px-4 py-16 text-center">
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 float-animation"></div>
      <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-secondary rounded-full opacity-30 float-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-primary rounded-full opacity-15 float-animation" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Find <span className="gradient-text">Verified</span><br />
          Local Technicians
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get your home, computer, or vehicle repaired by trusted professionals in your area. 
          Book appointments instantly with real-time availability.
        </p>

        {/* Search CTA */}
        <div className="glass-card rounded-xl p-6 max-w-2xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="What do you need help with?"
                className="pl-10 h-12 bg-muted/30 border-0"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location"
                className="pl-10 h-12 bg-muted/30 border-0"
              />
            </div>
            <Button size="lg" className="h-12 px-8 bg-gradient-primary hover:scale-105 transition-transform">
              Search Technicians
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">500+</h3>
            <p className="text-muted-foreground">Verified Technicians</p>
          </div>
          
          <div className="glass-card rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-secondary rounded-lg mx-auto mb-4">
              <Star className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">4.9</h3>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          
          <div className="glass-card rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">50+</h3>
            <p className="text-muted-foreground">Cities Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;