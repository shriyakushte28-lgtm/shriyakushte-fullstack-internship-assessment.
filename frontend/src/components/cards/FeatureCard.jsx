function FeatureCard({icon,title,description}){

return(

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">

<div className="text-5xl">

{icon}

</div>

<h2 className="text-2xl font-bold mt-6">

{title}

</h2>

<p className="text-gray-500 mt-4 leading-7">

{description}

</p>

</div>

)

}

export default FeatureCard;