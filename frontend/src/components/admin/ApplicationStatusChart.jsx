import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
    "#F59E0B", // PENDING -> warning amber
    "#3B82F6", // SHORTLISTED -> primary blue-500
    "#16A34A", // ACCEPTED -> success green
    "#64748B"  // REJECTED -> slate-500
];

function ApplicationStatusChart({ data }) {
    const chartData = Object.entries(data).map(([name, value]) => ({
        name: name.toUpperCase(),
        value
    }));

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-[320px]">
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Application Status Distribution
            </h3>
            <div className="h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={45}
                            outerRadius={70}
                            paddingAngle={3}
                            labelLine={false}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                border: "1px solid #E2E8F0",
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#0F172A"
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={32}
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{
                                fontSize: "10px",
                                fontWeight: "700",
                                color: "#64748B",
                                textTransform: "uppercase"
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ApplicationStatusChart;