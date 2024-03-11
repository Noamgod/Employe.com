import React from "react";
import Header from "./Shard/Header/Header";
import Footer from "./Shard/Footer/Footer";
import Box from "@mui/material/Box";

export default function BaseLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Box sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    justifyContent: 'space-between'
                }
            }>
                <Box>
                    <Header />
                    {children}
                </Box>
                <Footer/>
            </Box>

        </>
    )
}