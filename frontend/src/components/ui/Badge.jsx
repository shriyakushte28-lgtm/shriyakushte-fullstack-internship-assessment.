function Badge({

    children,

    variant = "primary"

}) {

    const styles = {

        primary:
            "bg-blue-100 text-blue-700",

        success:
            "bg-green-100 text-green-700",

        danger:
            "bg-red-100 text-red-700",

        warning:
            "bg-yellow-100 text-yellow-700",

        gray:
            "bg-slate-100 text-slate-700"

    };

    return (

        <span

            className={`

                inline-flex

                px-3

                py-1

                rounded-full

                text-sm

                font-medium

                ${styles[variant]}

            `}

        >

            {children}

        </span>

    );

}

export default Badge;