import { app, BrowserWindow, screen  } from "electron";
import {activeWindow} from 'get-windows';


let mainWindow, toolboxWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true },
  });

  toolboxWindow = new BrowserWindow({
    width: 200,
    height: 100,
    alwaysOnTop: true,
    frame: false, // 无边框
    transparent: false, // 透明背景
    webPreferences: { nodeIntegration: true },
  });

  setInterval(async () => {
    // console.log(await getActiveWin());
    const win = await activeWindow();
    console.log(win);
    if (win && win.owner && win.owner.name) {
      console.log(`当前窗口: ${win.title} - ${win.owner.name}`);
  
      const display = screen.getPrimaryDisplay();
      const { width: screenWidth, height: screenHeight } = display.bounds;
      const scaleFactor = display.scaleFactor;
  
      let newX = Math.round((win.bounds.x + win.bounds.width) / scaleFactor);
      let newY = Math.round(win.bounds.y / scaleFactor);
      let newWidth = 200;
      let newHeight = Math.round(win.bounds.height / scaleFactor);
  
      // 边界检查
      if (newX + newWidth > screenWidth) newX = screenWidth - newWidth;
      if (newY + newHeight > screenHeight) newY = screenHeight - newHeight;
  
      console.log(`修正后吸附位置: x=${newX}, y=${newY}, w=${newWidth}, h=${newHeight}`);
  
      toolboxWindow.setBounds({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    }
  }, 1000);
});
