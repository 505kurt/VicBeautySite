import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Iridescence from "./Iridescence"
import MobileGlitter from "./MobileGlitter"
import mobileBg from "../assets/images/mobile-bg.jpg"

export default function Background() {
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(min-width: 1280px)").matches
        }
        return false
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1280px)")
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)

        mediaQuery.addEventListener("change", handler)
        return () => mediaQuery.removeEventListener("change", handler)
    }, [])

    return (
        <>
            {/* Fundo para dispositivos móveis: altura 100%, proporção mantida, centralizado */}
            <div
                className="fixed inset-0 w-full h-full -z-10 xl:hidden bg-no-repeat bg-center pointer-events-none"
                style={{
                    backgroundImage: `url(${mobileBg})`,
                    backgroundSize: "auto 100%",
                }}
            />

            {/* Efeito glitter de partículas para mobile (compartimentarizado: remova ou comente para voltar atrás) */}
            {!isDesktop && <MobileGlitter />}

            {/* Fundo animado para desktop */}
            {isDesktop && (
                <div className="hidden xl:block">
                    <Iridescence color={[0.15, 0, 0]} />
                </div>
            )}

            <Outlet />
        </>
    )
}
