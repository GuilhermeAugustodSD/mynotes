import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { AppRoutesAdmin } from "./admin.routes";
import { Provider } from "react-redux";
import store from "../store";

export function Routes() {

    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Provider store={store}>
                {user ?
                    user.perfil === 1 ?
                        <>
                            <AppRoutes />
                            <AppRoutesAdmin />
                        </>
                        :
                        <AppRoutes />
                    :
                    <AuthRoutes />}
            </Provider>
        </BrowserRouter>
    );
}