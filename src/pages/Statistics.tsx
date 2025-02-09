
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";

const Statistics = () => {
  const [timeframe, setTimeframe] = useState("1Y");

  const { data: stats, isLoading } = useQuery({
    queryKey: ["waterLevelStats"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return {
        high: 399,
        low: 223,
        average: 86.31,
      };
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">Historical Data</h1>
      
      <div className="glass-card p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Statistics</h2>
          <div className="flex gap-2">
            {["1W", "1M", "3M", "6M", "YTD", "1Y", "2Y", "5Y", "10Y"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  timeframe === tf
                    ? "bg-secondary text-primary font-medium"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass-card p-4">
              <div className="text-white/80 mb-1">High</div>
              <div className="text-2xl font-bold">{stats?.high}m</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-white/80 mb-1">Low</div>
              <div className="text-2xl font-bold">{stats?.low}m</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-white/80 mb-1">Average</div>
              <div className="text-2xl font-bold">{stats?.average}M</div>
            </div>
          </div>
        )}

        <div className="h-64 relative">
          {/* TODO: Add chart implementation */}
          <div className="absolute inset-0 flex items-center justify-center text-white/60">
            Chart coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
