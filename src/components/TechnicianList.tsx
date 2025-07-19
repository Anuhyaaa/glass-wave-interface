import { useState, useEffect } from "react";
import { Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TechnicianCard from "./TechnicianCard";
import BookingModal from "./BookingModal";
import { supabase } from "@/integrations/supabase/client";

interface Technician {
  id: string;
  name: string;
  avatar_url: string | null;
  location: string;
  hourly_rate: number;
  is_verified: boolean;
  response_time: string;
  completed_jobs: number;
  specialties: string[];
  rating: number;
  reviewCount: number;
}

const TechnicianList = () => {
  const [sortBy, setSortBy] = useState("distance");
  const [filterBy, setFilterBy] = useState("all");
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      setIsLoading(true);
      
      // Fetch technicians with their specialties and reviews
      const { data: technicianData, error: techError } = await supabase
        .from('technicians')
        .select(`
          id,
          name,
          avatar_url,
          location,
          hourly_rate,
          is_verified,
          response_time,
          completed_jobs,
          technician_specialties (
            service_categories (
              name
            )
          )
        `);

      if (techError) throw techError;

      // Calculate ratings and review counts for each technician
      const techniciansWithRatings = await Promise.all(
        (technicianData || []).map(async (tech) => {
          const { data: reviews } = await supabase
            .from('reviews')
            .select('rating')
            .eq('technician_id', tech.id);

          const reviewCount = reviews?.length || 0;
          const avgRating = reviewCount > 0 
            ? reviews!.reduce((sum, review) => sum + review.rating, 0) / reviewCount
            : 4.5; // Default rating for new technicians

          return {
            id: tech.id,
            name: tech.name,
            avatar_url: tech.avatar_url,
            location: tech.location,
            hourly_rate: tech.hourly_rate,
            is_verified: tech.is_verified,
            response_time: tech.response_time,
            completed_jobs: tech.completed_jobs,
            specialties: tech.technician_specialties?.map((ts: any) => ts.service_categories.name) || [],
            rating: Math.round(avgRating * 10) / 10,
            reviewCount: reviewCount
          };
        })
      );

      setTechnicians(techniciansWithRatings);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (technicianId: string) => {
    const technician = technicians.find(t => t.id === technicianId);
    if (technician) {
      setSelectedTechnician(technician);
      setIsBookingModalOpen(true);
    }
  };

  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Available <span className="gradient-text">Technicians</span>
            </h2>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Showing results near you • {technicians.length} technicians found</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 glass-card border-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass-card border-0">
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48 glass-card border-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="glass-card border-0">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="computer">Computer Repair</SelectItem>
                <SelectItem value="home">Home Appliances</SelectItem>
                <SelectItem value="vehicle">Vehicle Repair</SelectItem>
                <SelectItem value="mobile">Mobile Devices</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="glass-card border-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Technician Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="glass-card p-6 animate-pulse">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded mb-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {technicians.map((technician, index) => (
              <div
                key={technician.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TechnicianCard technician={technician} onBookNow={handleBookNow} />
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="glass-card border-0 hover:bg-primary/10">
            Load More Technicians
          </Button>
        </div>
      </div>

      {selectedTechnician && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedTechnician(null);
          }}
          technician={selectedTechnician}
        />
      )}
    </section>
  );
};

export default TechnicianList;