function HowItWorks(){

const steps=[

"Create Account",

"Complete Profile",

"Apply for Internship",

"Get Hired"

];

return(

<section className="py-24">

<div className="max-w-6xl mx-auto">

<h2 className="text-4xl font-bold text-center">

How It Works

</h2>

<div className="grid md:grid-cols-4 gap-10 mt-16">

{

steps.map((step,index)=>(

<div key={index} className="text-center">

<div className="w-20 h-20 rounded-full bg-blue-600 text-white flex justify-center items-center mx-auto text-3xl font-bold">

{index+1}

</div>

<h3 className="text-xl font-semibold mt-6">

{step}

</h3>

</div>

))

}

</div>

</div>

</section>

)

}

export default HowItWorks;