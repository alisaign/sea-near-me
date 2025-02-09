
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

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
        historicalData: [
          { date: "2023-01", level: 250 },
          { date: "2023-02", level: 280 },
          { date: "2023-03", level: 300 },
          { date: "2023-04", level: 320 },
          { date: "2023-05", level: 340 },
          { date: "2023-06", level: 360 },
          { date: "2023-07", level: 380 },
          { date: "2023-08", level: 350 },
          { date: "2023-09", level: 330 },
          { date: "2023-10", level: 310 },
          { date: "2023-11", level: 290 },
          { date: "2023-12", level: 270 },
        ]
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
              <div className="text-2xl font-bold">{stats?.average}m</div>
            </div>
          </div>
        )}

        <div className="h-64 relative">
          {!isLoading && stats?.historicalData && (
            <ChartContainer 
              className="w-full h-full" 
              config={{
                line: { theme: { light: "hsl(var(--primary))", dark: "hsl(var(--primary))" } },
                background: { theme: { light: "hsl(var(--primary) / 0.1)", dark: "hsl(var(--primary) / 0.1)" } },
              }}
            >
              <AreaChart data={stats.historicalData}>
                <defs>
                  <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--foreground))" 
                  tickFormatter={(value) => format(new Date(value), 'MMM')}
                />
                <YAxis stroke="hsl(var(--foreground))" />
                <CartesianGrid strokeDasharray="3 3" />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorLevel)"
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
