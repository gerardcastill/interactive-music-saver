import React from "react";
import AboutPage from "./static-pages/AboutPage";
import NavbarLayout from "../components/layouts/NavbarLayout";

function AboutMePage() {
    return (
        <NavbarLayout>
            <AboutPage />
        </NavbarLayout>
    );
}

export default AboutMePage;