import { Outlet } from "react-router-dom"

const Authlayout = () => {
    return (
        <>
            <main>
                {<Outlet />}
            </main>
        </>
    )
}

export default Authlayout