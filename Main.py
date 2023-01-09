from cefpython3     import cefpython as cef
from SDK.localSDK   import localSDK
from Handlers       import *
from BrowserFrame   import *
from MainFrame      import MainFrame
from DataService    import DataService
import threading    as thread
import tkinter      as tk
import sys
import os

def main():
    # Create MorphCast SDK
    sdk = localSDK()
    global freePort; freePort = sdk.returnFreePort()
    
    sdkThread = thread.Thread(target=sdk.start)
    sdkThread.start()

    # Sqlite
    dataService = DataService()
    def sqlLoop():
        thread.Timer(5.0, sqlLoop).start()
        dataService.calculate()
    sqlLoop()

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