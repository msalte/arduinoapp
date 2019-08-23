import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "components/AppContainer";

import "typeface-nunito";
import "./app.scss";
import "semantic-ui-css/semantic.min.css";

render(
    <BrowserRouter>
        <AppContainer />
    </BrowserRouter>,
    document.getElementById("app")
);