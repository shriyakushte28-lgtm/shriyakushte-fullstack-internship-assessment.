function Button({

    children,

    onClick,

    type = "button",

    variant = "primary",

    className = "",

    disabled = false

}) {

    const styles = {

        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-slate-100 hover:bg-slate-200 text-slate-800",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        outline:
            "border border-slate-300 hover:bg-slate-100 text-slate-700"

    };

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className={`

                px-5

                py-2.5

                rounded-lg

                font-medium

                transition-all

                duration-200

                disabled:opacity-50

                ${styles[variant]}

                ${className}

            `}

        >

            {children}

        </button>

    );

}

export default Button;