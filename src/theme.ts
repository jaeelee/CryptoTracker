import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    bgColor: "#FDF6EC",
    textColor: "#1B1A17",
    accentColor: "#f1c40f",
    cardColor: "rgba(230,213,184,1)",
    inactiveColor: "rgb(224, 216, 176,0.3)",
}


export const darkTheme: DefaultTheme = {
    bgColor: "#2f3542",
    textColor: "#ffffff",
    accentColor: "#f1c40f",
    cardColor: "rgba(0,0,0,0.5)",
    inactiveColor: "rgba(0,0,0,0.3)",
}

export const theme = {
    lightTheme,
    darkTheme
}