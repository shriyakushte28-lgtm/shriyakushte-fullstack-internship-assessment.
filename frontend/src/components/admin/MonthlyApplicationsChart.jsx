import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function MonthlyApplicationsChart({ data }) {
    const chartData = Object.entries(data).map(([month, value]) => ({
        month: month.substring(0, 3),
        applications: value
    }));

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-[320px]">
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Monthly Submissions Trend
            </h3>
            <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ left: -25 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="#94A3B8"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#94A3B8"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: '#F8FAFC', opacity: 0.8 }}
                            contentStyle={{
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                border: "1px solid #E2E8F0",
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#0F172A"
                            }}
                        />
                        <Bar
                            dataKey="applications"
                            fill="#2563EB"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={24}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MonthlyApplicationsChart;