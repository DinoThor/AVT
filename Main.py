from cefpython3         import cefpython as cef
from SDK.LocalSDK       import LocalSDK
from SDK.MainFrame      import MainFrame
from DB.DataService     import DataService
from PatternLoop        import PatternLoop
import threading        as thread
import tkinter          as tk
import sys


def main():
    
    init()
   
    app.mainloop()
    patternLoop.VectorLoop()

    shutdown()


def init():
    global SDK
    global dataService
    global patternLoop
    global app

    SDK = LocalSDK()
    dataService = DataService(1)            #USER HARDCODED PARA PRUEBAS
    patternLoop = PatternLoop(dataService)
    thread.Thread(target=SDK.start).start() #SDK Thread
    sys.excepthook = cef.ExceptHook         #CEF & Tkinter
    root = tk.Tk()
    app  = MainFrame(root, SDK.port, patternLoop)
    cef.Initialize(commandLineSwitches = {"enable-media-stream": " "})


def shutdown():
    cef.Shutdown()
    SDK.httpd.shutdown()
    patternLoop.running = False


if __name__ == '__main__':
    main()
