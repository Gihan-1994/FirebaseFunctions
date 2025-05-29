
import React from 'react';

type AuthButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    colour?: 'green'|'blue';
};
const AuthButton: React.FC<AuthButtonProps> = ({
                                                   type = 'button',
                                                   onClick,
                                                   disabled = false,
                                                   loading = false,
                                                   children,
                                                   variant = 'primary',
                                                   colour = 'blue',
                                               }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition shadow-md ease-in-out delay-150 hover:-translate hover:scale-110 duration-200 flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-offset-4  ';

    const variantColours = {

        green: 'bg-green-400  hover:bg-green-700 focus:ring-green-800 text-green-800 ',
        blue: 'bg-blue-400  hover:bg-blue-700 focus:ring-indigo-800 text-blue-800 ',
    };

    const variantClasses = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2  ',
        secondary:`${variantColours[colour]} text-white focus:ring-2  ` ,
        outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 ',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${disabled || loading ? disabledClasses : ''}
      `}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};

export default AuthButton;