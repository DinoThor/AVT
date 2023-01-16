import tkinter as tk
from SDK.BrowserFrame import *

class MainFrame(tk.Frame):

    def __init__(self, root, port, pl):
        self.browser_frame  = None
        self.root           = root
        self.port           = port
        self.pl             = pl

        # Root
        root.geometry("800x686")
        root.resizable(False, False)

        # MainFrame
        tk.Frame.__init__(self, root)
        self.master.title("MorphCast Spectrum - VRAIN")
        
        # BrowserFrame
        self.browser_frame = BrowserFrame(self, url = f"http://localhost:{port}", pl = self.pl)
        self.browser_frame.grid (row=0, column=0, sticky=(tk.N + tk.S + tk.E + tk.W))
        tk.Grid.rowconfigure    (self, 0, weight=1)
        tk.Grid.columnconfigure (self, 0, weight=1)

        # Pack MainFrame
        self.pack(fill=tk.BOTH, expand=tk.YES)