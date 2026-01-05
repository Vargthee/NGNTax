import { TaxBandBreakdown, formatNaira } from "@/lib/taxUtils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TaxBandChartProps {
  breakdown: TaxBandBreakdown[];
}

// Muted teal palette - calming, not flashy
const COLORS = [
  "hsl(160, 35%, 45%)",
  "hsl(160, 30%, 50%)",
  "hsl(160, 25%, 55%)",
  "hsl(160, 20%, 60%)",
  "hsl(160, 15%, 65%)",
  "hsl(160, 10%, 70%)",
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
        <div className="rounded-md border border-border/50 bg-card px-3 py-2 shadow-sm">
          <p className="text-xs font-medium mb-1">{data.fullName}</p>
          <p className="text-xs text-muted-foreground">
            Income: <span className="text-foreground tabular-nums">{formatNaira(data.income)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Tax: <span className="text-primary tabular-nums">{formatNaira(data.tax)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg border border-border/50 bg-card p-5">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Tax by band</h3>
      <div className="h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: 'hsl(220, 8%, 50%)' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: 'hsl(220, 8%, 50%)' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(160, 20%, 94%)' }} />
            <Bar dataKey="tax" radius={[3, 3, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 justify-center">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div 
              className="w-2 h-2 rounded-sm" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}