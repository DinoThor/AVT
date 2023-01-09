from cefpython3 import cefpython as cef
from SDK.localSDK import localSDK
from Handlers import *
from BrowserFrame import *
from MainFrame import MainFrame
from DataService import DataService
import threading as thread
import tkinter as tk
import sys

def main():
    # Create MorphCast SDK
    sdk = localSDK()
    global freePort; freePort = sdk.returnFreePort()
    sdkThread = thread.Thread(target=sdk.start)
    sdkThread.start()

    # Sqlite
    dataService = DataService()
    # sqlThread = thread.Thread(target = dataService.run())
    # sqlThread.start()

    sys.excepthook = cef.ExceptHook
    root = tk.Tk()
    app  = MainFrame(root, freePort)
    cef.Initialize(commandLineSwitches = {"enable-media-stream": " "})
    
    # =============
    app.mainloop()
    # =============

    cef.Shutdown()
    sdk.httpd.shutdown()

if __name__ == '__main__':
    main()