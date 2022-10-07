import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./routes";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(item => <Route path={item.path} element={<item.Component/>} key={item.path}/>)}
            <Route path="*" element={<Navigate to={'/'} replace />}/>
        </Routes>
    );
};

export default AppRouter;