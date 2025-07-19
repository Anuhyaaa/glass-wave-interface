import { useState } from "react";
import { Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TechnicianCard from "./TechnicianCard";

// Mock data - in real app this would come from your backend
const mockTechnicians = [
  {
    id: "1",
    name: "Mike Johnson",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Computer Repair", "Laptop Repair", "Software Installation"],
    location: "Downtown",
    distance: "2.3 miles",
    hourlyRate: 75,
    isVerified: true,
    responseTime: "< 1 hour",
    availability: "Available Now",
    completedJobs: 342
  },
  {
    id: "2",
    name: "Sarah Williams",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 89,
    specialties: ["Home Appliances", "Refrigerator", "Washing Machine"],
    location: "Westside",
    distance: "3.1 miles",
    hourlyRate: 65,
    isVerified: true,
    responseTime: "< 2 hours",
    availability: "Available Today",
    completedJobs: 256
  },
  {
    id: "3",
    name: "David Chen",
    avatar: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 156,
    specialties: ["Vehicle Repair", "Auto Diagnostics", "Engine Repair"],
    location: "North End",
    distance: "4.2 miles",
    hourlyRate: 85,
    isVerified: true,
    responseTime: "< 30 mins",
    availability: "Available Now",
    completedJobs: 478
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 203,
    specialties: ["Mobile Repair", "Screen Replacement", "Data Recovery"],
    location: "East Side",
    distance: "1.8 miles",
    hourlyRate: 55,
    isVerified: true,
    responseTime: "< 1 hour",
    availability: "Available Now",
    completedJobs: 521
  }
];

const TechnicianList = () => {
  const [sortBy, setSortBy] = useState("distance");
  const [filterBy, setFilterBy] = useState("all");

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
              <span>Showing results near you • {mockTechnicians.length} technicians found</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockTechnicians.map((technician, index) => (
            <div
              key={technician.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TechnicianCard technician={technician} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="glass-card border-0 hover:bg-primary/10">
            Load More Technicians
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechnicianList;