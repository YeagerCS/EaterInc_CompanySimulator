import { app, BrowserWindow } from "electron";
import path from "path"

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const startURL = "http://localhost:5173"

    mainWindow.loadURL(startURL)
    mainWindow.menuBarVisible = false;

    mainWindow.on("closed", () => mainWindow = null)
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    app.quit()
})


app.on("activate", () => {
    if(mainWindow === null) createWindow();
})