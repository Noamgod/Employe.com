import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "@mui/material";
import {Theme} from "./Theme/Theme";
import {QueryClient, QueryClientProvider} from "react-query";
import {UserContextProvider} from "./Contexts/userContexts";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>

    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
            <UserContextProvider>
                <App/>
            </UserContextProvider>
        </ThemeProvider>
    </QueryClientProvider>
</React.StrictMode>,)
