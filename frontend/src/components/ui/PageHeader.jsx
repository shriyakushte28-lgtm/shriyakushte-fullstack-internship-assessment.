function PageHeader({

    title,

    subtitle

}) {

    return (

        <div className="mb-8">

            <h1 className="text-4xl font-bold text-slate-900">

                {title}

            </h1>

            {

                subtitle &&

                <p className="text-slate-500 mt-2">

                    {subtitle}

                </p>

            }

        </div>

    );

}

export default PageHeader;