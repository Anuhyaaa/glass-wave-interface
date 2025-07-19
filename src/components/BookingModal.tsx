import { useState } from "react";
import { Calendar, Clock, MapPin, Phone, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  technician: {
    id: string;
    name: string;
    avatar_url: string | null;
    rating: number;
    hourly_rate: number;
    specialties: string[];
  };
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const BookingModal = ({ isOpen, onClose, technician }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
    urgency: "normal"
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log("Booking submitted:", { ...formData, selectedDate, selectedTime });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={technician.avatar_url || "/placeholder.svg"}
              alt={technician.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">Book {technician.name}</h2>
              <p className="text-muted-foreground">${technician.hourly_rate}/hour</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date & Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4" />
                <span>Select Date</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="glass-card border-0"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="time" className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4" />
                <span>Select Time</span>
              </Label>
              <Select value={selectedTime} onValueChange={setSelectedTime} required>
                <SelectTrigger className="glass-card border-0">
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent className="glass-card border-0">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4" />
                <span>Your Name</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="glass-card border-0"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="flex items-center space-x-2 mb-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="glass-card border-0"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4" />
              <span>Service Address</span>
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="glass-card border-0"
              placeholder="Enter full address where service is needed"
              required
            />
          </div>

          {/* Service Description */}
          <div>
            <Label htmlFor="description" className="mb-2 block">
              Describe the Issue
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="glass-card border-0 min-h-[100px]"
              placeholder="Please describe what needs to be fixed or repaired..."
              required
            />
          </div>

          {/* Urgency */}
          <div>
            <Label htmlFor="urgency" className="mb-2 block">
              Urgency Level
            </Label>
            <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
              <SelectTrigger className="glass-card border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card border-0">
                <SelectItem value="normal">Normal (Within 24 hours)</SelectItem>
                <SelectItem value="urgent">Urgent (Same day)</SelectItem>
                <SelectItem value="emergency">Emergency (ASAP)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pricing Estimate */}
          <div className="glass-card rounded-lg p-4 bg-muted/30">
            <h3 className="font-semibold mb-2">Estimated Cost</h3>
            <div className="flex justify-between items-center">
              <span>Hourly Rate:</span>
              <span className="font-bold">${technician.hourly_rate}/hour</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Service Call Fee:</span>
              <span>$25</span>
            </div>
            <hr className="my-2 border-border" />
            <div className="flex justify-between items-center font-bold">
              <span>Minimum Charge:</span>
              <span className="gradient-text">${technician.hourly_rate + 25}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:scale-105 transition-transform">
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;