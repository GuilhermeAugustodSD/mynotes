import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { AppRoutesAdmin } from "./admin.routes";

export function Routes() {

    const { user } = useAuth();

    const actualRoute = window.location.pathname;
    const regExp = /admin/mg;

    return (
        <BrowserRouter>
            {user ?
                regExp.test(actualRoute) ?
                    <AppRoutesAdmin/>
                    :
                    <AppRoutes />
                :
                <AuthRoutes />}
        </BrowserRouter>
    );
}