import type { ReactNode } from "react";

interface ButtonProps {
    className?: string;
    href?: string;
    children?: ReactNode;
}

export default function DefaultButton({ className, href, children } : ButtonProps) {
    return (
        <a href={href} className={`bg-[rgba(66,0,0,0.6)] cursor-pointer ${className}`}>
            {children}
        </a>
    )
}