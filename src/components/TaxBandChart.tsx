import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxBandBreakdown, formatNaira } from "@/lib/taxUtils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart3 } from "lucide-react";

interface TaxBandChartProps {
  breakdown: TaxBandBreakdown[];
}

const COLORS = [
  "hsl(150, 60%, 35%)",
  "hsl(150, 55%, 40%)",
  "hsl(150, 50%, 45%)",
  "hsl(150, 45%, 50%)",
  "hsl(150, 40%, 55%)",
  "hsl(150, 35%, 60%)",
];

export function TaxBandChart({ breakdown }: TaxBandChartProps) {
  if (breakdown.length === 0) {
    return null;
  }

  const chartData = breakdown.map((band, index) => ({
    name: `${(band.rate * 100).toFixed(0)}%`,
    fullName: band.band,
    income: band.taxableInBand,
    tax: band.taxAmount,
    rate: band.rate,
    colorIndex: index,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-card p-3 shadow-lg">
          <p className="font-medium text-sm mb-1">{data.fullName}</p>
          <p className="text-xs text-muted-foreground">
            Income in band: <span className="text-foreground font-medium">{formatNaira(data.income)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Tax at {(data.rate * 100).toFixed(0)}%: <span className="text-primary font-medium">{formatNaira(data.tax)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-primary" />
          Tax Band Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tax" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5 text-xs">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
