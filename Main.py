from cefpython3 import cefpython as cef
from SDK.localSDK import localSDK
from Handlers import *
from BrowserFrame import *
import threading as thread
import tkinter as tk
import sys


def main():
    # Create MorphCast SDK
    sdk = localSDK()
    global freePort
    freePort = sdk.returnFreePort()
    sdkThread = thread.Thread(target=sdk.start)
    sdkThread.start()

    sys.excepthook = cef.ExceptHook
    root = tk.Tk()
    app  = MainFrame(root)
    cef.Initialize(commandLineSwitches = {"enable-media-stream": " "})
    
    # =============
    app.mainloop()
    # =============

    cef.Shutdown()
    sdk.httpd.shutdown()

class MainFrame(tk.Frame):

    def __init__(self, root):
        self.browser_frame  = None
        self.root           = root

        # Root
        root.geometry("800x686")
        root.resizable(False, False)

        # MainFrame
        tk.Frame.__init__(self, root)
        self.master.title("MorphCast Spectrum - VRAIN")
        
        # BrowserFrame
        self.browser_frame = BrowserFrame(self, url=f"http://localhost:{freePort}")
        self.browser_frame.grid (row=0, column=0, sticky=(tk.N + tk.S + tk.E + tk.W))
        tk.Grid.rowconfigure    (self, 0, weight=1)
        tk.Grid.columnconfigure (self, 0, weight=1)

        # Pack MainFrame
        self.pack(fill=tk.BOTH, expand=tk.YES)
    
    def get_browser(self):
        if self.browser_frame:
            return self.browser_frame.browser
        return None

    def get_browser_frame(self):
        if self.browser_frame:
            return self.browser_frame
        return None

if __name__ == '__main__':
    main()