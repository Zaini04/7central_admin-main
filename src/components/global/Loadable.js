import React, { Suspense } from "react";
import PreLoader from "./PreLoader";

const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<PreLoader />}>
        <Component {...PreLoader} />
    </Suspense>
);

export default Loadable;
