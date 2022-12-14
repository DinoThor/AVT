from contextlib import closing
import http.server
import socket
import socketserver
import os

class localSDK():
    
    def __init__(self):
        self.port = self.findFreePort()
        self.Handler = http.server.SimpleHTTPRequestHandler
        self.httpd = socketserver.TCPServer(("", self.port), self.Handler)
        
    def start(self):
        os.chdir(os.getcwd() + "\SDK")
        self.httpd.serve_forever()

    def returnFreePort(self): return self.port

    def findFreePort(self):
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as s:
            s.bind(('', 0))
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            return s.getsockname()[1]