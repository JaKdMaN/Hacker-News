import React, {FC} from 'react';
import AppRouter from "./components/AppRouter";
import "./style/App.scss";
import {createTheme, ThemeProvider} from "@mui/material";

const App: FC = () => {

    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    return (
        <div className='app'>
            <ThemeProvider theme={theme}>
                <AppRouter/>
            </ThemeProvider>
        </div>
    );
}

export default App;
