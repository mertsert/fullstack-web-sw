import React from "react";
import { Route, Routes } from "react-router-dom";
import { CustomProvider, Panel } from "rsuite";
import People from "./People";
import Person from "./Person";

const Dashboard = () => {
    return (
        <CustomProvider theme="dark">
            <Panel  header={<h4>Star Wars App</h4>}>
                <Routes>
                    <Route path="/" element={<People />} />
                    <Route path="/person/:id" element={<Person />} />
                </Routes>
            </Panel>
        </CustomProvider>
    );
}
export default Dashboard;
