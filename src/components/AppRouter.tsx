import React, {FC} from 'react';
import {Route, Routes, Navigate} from "react-router";
import {RoutesNamesEnum} from "../router";
import NewsList from "../pages/NewsList/NewsList";
import OneOfNews from "../pages/OneOfNews/OneOfNews";

const AppRouter: FC = () => {
    return (
            <Routes>
                <Route
                    path={RoutesNamesEnum.NEWS_LIST}
                    element={<NewsList/>}
                />
                <Route
                    path={RoutesNamesEnum.ONE_OF_NEWS}
                    element={<OneOfNews/>}
                />
                <Route
                    path='*'
                    element={<Navigate to={RoutesNamesEnum.NEWS_LIST} replace/>}
                />
            </Routes>
    );
};

export default AppRouter;
