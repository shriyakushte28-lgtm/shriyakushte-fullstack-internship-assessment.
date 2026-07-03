import { UserPlus, UserCheck, Send, CheckCircle } from "lucide-react";

function HowItWorks() {
    const steps = [
        { title: "Register Profile", desc: "Create your student dashboard credentials", icon: UserPlus },
        { title: "Attach Resume", desc: "List your skill sets and academic credentials", icon: UserCheck },
        { title: "Apply Roles", desc: "Send applications with compatibility audits", icon: Send },
        { title: "Get Placed", desc: "Change status directly in the applications tracker", icon: CheckCircle }
    ];

    return (
        <section className="py-16 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Streamlined Workflow
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Landing your dream role is simple. Follow these four portal stages.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-center relative group">
                                {/* Step number tag */}
                                <div className="absolute top-3 right-3 text-xs font-bold text-slate-350">
                                    0{index + 1}
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-lg font-bold">
                                    <Icon size={18} />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 mt-4">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;