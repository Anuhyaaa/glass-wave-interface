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
        <div className="glass-card-intense rounded-2xl p-8 max-w-2xl mx-auto mb-8 shimmer">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Input
                placeholder="What do you need help with?"
                className="pl-12 h-14 bg-transparent border border-white/20 rounded-xl backdrop-blur-md text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white/5 transition-all duration-300"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Input
                placeholder="Enter your location"
                className="pl-12 h-14 bg-transparent border border-white/20 rounded-xl backdrop-blur-md text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white/5 transition-all duration-300"
              />
            </div>
            <Button variant="premium" size="lg" className="h-14 px-10 rounded-xl font-bold text-base">
              Search Technicians
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500 shimmer group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Wrench className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-2">500+</h3>
            <p className="text-muted-foreground font-medium">Verified Technicians</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500 shimmer group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Star className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-2">4.9</h3>
            <p className="text-muted-foreground font-medium">Average Rating</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500 shimmer group">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-2">50+</h3>
            <p className="text-muted-foreground font-medium">Cities Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;