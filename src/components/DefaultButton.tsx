import type { ReactNode } from "react";

interface ButtonProps {
    className?: string;
    href?: string;
    children?: ReactNode;
}

export default function DefaultButton({ className, href, children } : ButtonProps) {
    return (
        <a href={href} className={`bg-[rgb(66,0,0,0.4)] cursor-pointer ${className}`}>
            {children}
        </a>
    )
}