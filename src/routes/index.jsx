import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { AppRoutesAdmin } from "./admin.routes";
import { Provider } from "react-redux";
import store from "../store";

export function Routes() {

    const { user } = useAuth();

    const actualRoute = window.location.pathname;
    const regExp = /admin/mg;

    return (
        <BrowserRouter>
            {user ?
                    <>
                    <Provider store={store}>
                        <AppRoutes />
                        <AppRoutesAdmin/>
                    </Provider>
                    </>
                :
                <AuthRoutes />}
        </BrowserRouter>
    );
}