import tkinter as tk
from BrowserFrame import *

class MainFrame(tk.Frame):

    def __init__(self, root, port):
        self.browser_frame  = None
        self.root           = root
        self.port           = port

        # Root
        root.geometry("800x686")
        root.resizable(False, False)

        # MainFrame
        tk.Frame.__init__(self, root)
        self.master.title("MorphCast Spectrum - VRAIN")
        
        # BrowserFrame
        self.browser_frame = BrowserFrame(self, url=f"http://localhost:{port}")
        self.browser_frame.grid (row=0, column=0, sticky=(tk.N + tk.S + tk.E + tk.W))
        tk.Grid.rowconfigure    (self, 0, weight=1)
        tk.Grid.columnconfigure (self, 0, weight=1)

        # Pack MainFrame
        self.pack(fill=tk.BOTH, expand=tk.YES)