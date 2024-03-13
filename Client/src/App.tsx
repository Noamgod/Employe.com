import './App.css'
import Router from "./routers/router";
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./theme/Theme";
import {UserContextProvider} from "./contexts/userContexts";
import React from "react";
function App() {
    const queryClient = new QueryClient();

    return (
        <>

            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={Theme}>
                    <UserContextProvider>
                        <Router/>
                    </UserContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
