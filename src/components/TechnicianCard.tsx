import { Star, MapPin, Clock, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TechnicianCardProps {
  technician: {
    id: string;
    name: string;
    avatar_url: string | null;
    rating: number;
    reviewCount: number;
    specialties: string[];
    location: string;
    hourly_rate: number;
    is_verified: boolean;
    response_time: string;
    completed_jobs: number;
  };
  onBookNow?: (technicianId: string) => void;
}

const TechnicianCard = ({ technician, onBookNow }: TechnicianCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={technician.avatar_url || "/placeholder.svg"}
              alt={technician.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            {technician.is_verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-background rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {technician.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{technician.location} • 2.5 miles</span>
            </div>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{technician.rating}</span>
          <span className="text-sm text-muted-foreground">({technician.reviewCount})</span>
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technician.specialties.slice(0, 3).map((specialty) => (
          <Badge key={specialty} variant="secondary" className="bg-primary/10 text-primary border-0">
            {specialty}
          </Badge>
        ))}
        {technician.specialties.length > 3 && (
          <Badge variant="outline" className="border-dashed">
            +{technician.specialties.length - 3} more
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Response: {technician.response_time}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-muted-foreground">{technician.completed_jobs} jobs done</span>
        </div>
      </div>

      {/* Availability & Rate */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-500">Available Now</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold gradient-text">${technician.hourly_rate}</span>
          <span className="text-sm text-muted-foreground">/hour</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/10">
          <Calendar className="h-4 w-4 mr-2" />
          View Profile
        </Button>
        <Button 
          onClick={() => onBookNow?.(technician.id)}
          className="flex-1 bg-gradient-primary hover:scale-105 transition-transform"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default TechnicianCard;