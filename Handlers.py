class LifespanHandler(object):
    def __init__(self, tkFrame):
        self.tkFrame = tkFrame

class LoadHandler(object):
    def __init__(self, browser_frame):
        self.browser_frame = browser_frame

class DisplayHandler(object):
    def OnConsoleMessage(self, browser, message, **_):
        print(message)
        return

    

# class V8ContextHandler(object):
#     def __init__(self) -> None:
#         pass