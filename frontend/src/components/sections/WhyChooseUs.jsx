import FeatureCard from "../cards/FeatureCard";

const features = [
    {
        icon: "📄",
        title: "Resume Matching",
        description: "Upload and audit your resume dynamically against target internship skills."
    },
    {
        icon: "🏢",
        title: "Verified Companies",
        description: "Explore opportunities only from trust-verified recruiters."
    },
    {
        icon: "📊",
        title: "Application Timelines",
        description: "Track every step of your submissions in a real-time progress flow."
    },
    {
        icon: "🔔",
        title: "Instant Notifications",
        description: "Get alerts on status updates, interview schedules, and deadlines."
    },
    {
        icon: "👨‍💼",
        title: "Interview Scheduling",
        description: "Organize upcoming recruiter interviews in a unified queue."
    },
    {
        icon: "🔒",
        title: "Secure Verification",
        description: "Access and authenticate role permissions safely with JWT tokens."
    }
];

function WhyChooseUs() {
    return (
        <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Why Students Use InternSphere
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Equipped with core tools to match, apply, and monitor active internship pipelines.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;