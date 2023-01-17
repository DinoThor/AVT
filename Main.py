from cefpython3         import cefpython as cef
from SDK.localSDK       import localSDK
from SDK.Handlers       import *
from SDK.BrowserFrame   import *
from SDK.MainFrame      import MainFrame
from DB.DataService     import DataService
from PatternLoop        import PatternLoop
import threading        as thread
import tkinter          as tk
import sys

def main():
    SDK         = localSDK()
    dataService = DataService(1) #USER HARDCODED PARA PRUEBAS
    patternLoop = PatternLoop(dataService)
    #SDK Thread
    thread.Thread(target=SDK.start).start()
    #CEF & Tkinter
    sys.excepthook = cef.ExceptHook
    root = tk.Tk()
    app  = MainFrame(root, SDK.port, patternLoop)
    cef.Initialize(commandLineSwitches = {"enable-media-stream": " "})
    
    # =============
    patternLoop.VectorLoop()
    app.mainloop()
    # =============

    cef.Shutdown()
    SDK.httpd.shutdown()
    patternLoop.running = False


if __name__ == '__main__':
    main()