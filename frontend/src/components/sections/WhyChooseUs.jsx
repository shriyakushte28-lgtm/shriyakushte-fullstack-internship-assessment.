import FeatureCard from "../cards/FeatureCard";

const features=[

{
icon:"📄",
title:"Resume Upload",
description:"Upload and manage your resume."
},

{
icon:"🏢",
title:"Verified Companies",
description:"Apply only to trusted recruiters."
},

{
icon:"📊",
title:"Application Tracking",
description:"Track every internship application."
},

{
icon:"🔔",
title:"Notifications",
description:"Never miss deadlines or updates."
},

{
icon:"👨‍💼",
title:"Interview Scheduling",
description:"View upcoming interviews easily."
},

{
icon:"🔒",
title:"Secure Platform",
description:"Protected using JWT Authentication."
}

];

function WhyChooseUs(){

return(

<section className="bg-slate-50 py-24">

<div className="max-w-7xl mx-auto px-8">

<h2 className="text-4xl font-bold text-center">

Why Choose InternSphere

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

{

features.map((feature,index)=>(

<FeatureCard

key={index}

icon={feature.icon}

title={feature.title}

description={feature.description}

/>

))

}

</div>

</div>

</section>

)

}

export default WhyChooseUs;