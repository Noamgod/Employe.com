import React from "react";
import Header from "./shard/header/header";
import Footer from "./shard/footer/footer";
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