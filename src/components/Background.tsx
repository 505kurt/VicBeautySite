import { Outlet } from "react-router-dom"

import Iridescence from "./Iridescence"

export default function Background() {
    return (
        <>
            <Iridescence color={[0.15, 0, 0]} />
            <Outlet />
        </>
    )
}