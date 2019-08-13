import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "typeface-nunito";

const App = () => {
    return <div>Hello world</div>;
};

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
