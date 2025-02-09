
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { format } from "date-fns";

const Index = () => {
  // Hardcoded Montreal coordinates
  const location = {
    lat: 45.5017,
    lng: -73.5673
  };

  const { data: waterLevel, isLoading } = useQuery({
    queryKey: ["currentWaterLevel", location],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return { level: 75 };
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold text-white">Sea Near Me</h1>
        
        <div className="flex items-center gap-2 text-white/80">
          <MapPin className="w-5 h-5" />
          <span>Montreal, Canada</span>
        </div>

        <div className="text-white/60">
          {format(new Date(), "EEEE, MMMM d, yyyy")}
          <br />
          {format(new Date(), "h:mm:ss a")}
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Water Level Monitor</h2>
          
          <div className="wave-container h-48">
            <div 
              className="wave"
              style={{
                transform: `translateY(${100 - (waterLevel?.level || 0)}%)`
              }}
            />
            
            <div className="absolute bottom-4 right-4 glass-card px-4 py-2">
              <div className="text-sm text-white/80">Current Level</div>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : `${waterLevel?.level}m`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
