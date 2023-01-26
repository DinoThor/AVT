import tkinter as tk

from SDK.BrowserFrame import *


class MainFrame(tk.Frame):


    def __init__(self, root, port, pl):
        self.browser_frame  = None
        self.root           = root
        self.port           = port
        self.pl             = pl

        # Root
        width = 800
        height = 686
        center_x = int(root.winfo_screenwidth()/2 - 800 / 2)
        center_y = int(root.winfo_screenheight()/2 - 686 / 2)
        root.geometry(f'{width}x{height}+{center_x}+{center_y}')
        root.iconbitmap('res/logo_vrain.ico')
        root.resizable(False, False)

        # MainFrame
        tk.Frame.__init__(self, root)
        self.master.title("MorphCast Spectrum - VRAIN")
        
        # Menu
        menubar = tk.Menu(root)
        menubar.add_command(label="Usuarios", command=self.users)
        root.config(menu=menubar)

        
        # BrowserFrame
        self.browser_frame = BrowserFrame(self, url=f"http://localhost:{port}", pl=self.pl)
        self.browser_frame.grid (row=0, column=0, sticky=(tk.N + tk.S + tk.E + tk.W))
        tk.Grid.rowconfigure    (self, 0, weight=1)
        tk.Grid.columnconfigure (self, 0, weight=1)

        # Pack MainFrame
        self.pack(fill=tk.BOTH, expand=tk.YES)


    def users(self):
        pass