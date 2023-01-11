from cefpython3     import cefpython as cef
from SDK.localSDK   import localSDK
from Handlers       import *
from BrowserFrame   import *
from MainFrame      import MainFrame
from DB.DataService import DataService
import threading    as thread
import tkinter      as tk
import sys

def main():
    SDK         = localSDK()
    dataService = DataService(1) #USER HARDCODED PARA PRUEBAS
    #SDK Thread
    thread.Thread(target=SDK.start).start()
    #CEF & Tkinter
    sys.excepthook = cef.ExceptHook
    root = tk.Tk()
    app  = MainFrame(root, SDK.port, dataService)
    cef.Initialize(commandLineSwitches = {"enable-media-stream": " "})
    
    # =============
    app.mainloop()
    # =============

    cef.Shutdown()
    SDK.httpd.shutdown()

if __name__ == '__main__':
    main()