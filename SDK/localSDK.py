from   contextlib import closing
import http.server
import socket, socketserver

class localSDK():
    
    def __init__(self):
        self.port       = self.findFreePort()
        self.httpd      = socketserver.TCPServer(("", self.port), Handler)
        
    def start(self):
        self.httpd.serve_forever()

    def findFreePort(self):
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as s:
            s.bind(('', 0))
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            return s.getsockname()[1]

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="SDK\\", **kwargs)