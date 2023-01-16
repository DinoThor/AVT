class LifespanHandler(object):
    def __init__(self, tkFrame):
        self.tkFrame = tkFrame

class LoadHandler(object):
    def __init__(self, browser_frame):
        self.browser_frame = browser_frame

class DisplayHandler(object):
    def __init__(self, pl):
        self.PatternLoop = pl
    
    def OnConsoleMessage(self, message, **_):
        rawData = message.split('|')
        arousal, valence = rawData[0], rawData[1]
        self.PatternLoop.getData(float(arousal), float(valence))
        return