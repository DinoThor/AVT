from cefpython3 import cefpython as cef
from Handlers import *
from BrowserFrame import *
from DB.DataService import DataService
import tkinter as tk
import ctypes
import platform

class BrowserFrame(tk.Frame):

    def __init__(self, mainframe, url, ds):
        self.closing    = False
        self.browser    = None
        self.url        = url
        self.mainframe  = mainframe
        self.ds         = ds

        tk.Frame.__init__(self, mainframe)
        self.bind("<Configure>", self.on_configure)

    def embed_browser(self):
        window_info = cef.WindowInfo()
        rect = [0, 0, self.winfo_width(), self.winfo_height()]
        window_info.SetAsChild(self.get_window_handle(), rect)
        self.browser = cef.CreateBrowserSync(window_info, url = self.url)
        assert self.browser
        self.browser.SetClientHandler(LifespanHandler(self))
        self.browser.SetClientHandler(LoadHandler(self))
        self.browser.SetClientHandler(DisplayHandler(self.ds))
        self.message_loop_work()

    def get_window_handle(self):
        if self.winfo_id() > 0:
            return self.winfo_id()
        else:
            raise Exception("Couldn't obtain window handle")

    def message_loop_work(self):
        cef.MessageLoopWork()
        self.after(10, self.message_loop_work)

    def on_configure(self, _):
        if not self.browser:
            self.embed_browser()

    def on_mainframe_configure(self, width, height):
        if self.browser:
            if (platform.system() == "Windows"):
                ctypes.windll.user32.SetWindowPos(
                    self.browser.GetWindowHandle(), 
                    0, 0, 0, width, height, 0x0002)

            elif (platform.system() == "Linux"):
                self.browser.SetBounds(0, 0, width, height)

    def on_root_close(self):
        if self.browser:
            self.browser.CloseBrowser(True)
            self.clear_browser_references()
        else:
            self.destroy()

    def clear_browser_references(self):
        # Clear browser references that you keep anywhere in your
        # code. All references must be cleared for CEF to shutdown cleanly.
        self.browser = None
