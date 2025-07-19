import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="mt-20 px-4 py-16 border-t border-border/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">T</span>
              </div>
              <h3 className="gradient-text text-lg font-bold">TechFinder</h3>
            </div>
            <p className="text-muted-foreground">
              Connect with verified local technicians for all your repair needs. 
              Fast, reliable, and trusted.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Computer Repair</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Home Appliances</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vehicle Repair</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mobile Devices</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Plumbing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Electrical</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-TECHFIND</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@techfinder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Available in 50+ cities</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-2">
              <h5 className="font-medium">Stay Updated</h5>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="glass-card border-0 bg-muted/30 text-sm"
                />
                <Button size="sm" className="bg-gradient-primary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2024 TechFinder. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;