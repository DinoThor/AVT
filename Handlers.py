class LifespanHandler(object):
    def __init__(self, tkFrame):
        self.tkFrame = tkFrame

class LoadHandler(object):
    def __init__(self, browser_frame):
        self.browser_frame = browser_frame

class DisplayHandler(object):
    def __init__(self, ds):
        self.dataService = ds
    
    def OnConsoleMessage(self, message, **_):
        arousal, valence = message.split()[0], message.split()[2]
        self.dataService.entryPoint(arousal, valence)
        return