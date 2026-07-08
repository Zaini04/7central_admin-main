import ScrollToTop from "components/global/ScrollToTop";
import { useRoutes } from "react-router-dom";
import Router from "routes/Router";
import { useApi } from "./config/api";


function App() {
    const api = useApi();
    const routing = useRoutes(Router)

    return (
        <>
            <ScrollToTop>
                {routing}
            </ScrollToTop>
        </>
    );
}

export default App;
