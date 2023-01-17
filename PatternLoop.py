import datetime
import threading

class PatternLoop():

    def __init__(self, ds):
        self.dataService = ds

        self.arousal = []
        self.valence = []
        self.running = True

    def getData(self, arousal, valence):
        self.arousal.append(arousal)
        self.valence.append(valence)

    def VectorLoop(self):
        try:
            arousalAvg = sum(self.arousal) / len(self.arousal)
            valenceAvg = sum(self.valence) / len(self.valence)
        except ZeroDivisionError:
            self.arousal.clear()
            self.valence.clear()
            if self.running: threading.Timer(5.0, self.VectorLoop).start()
            return

        instance   = datetime.datetime.now()
        event      = self.detectEvent(arousalAvg, valenceAvg)

        self.dataService.insertDetail(arousalAvg, valenceAvg, instance, event)
        if self.running: threading.Timer(5.0, self.VectorLoop).start()

    """
        Return:
        Event || None
    """
    def detectEvent(self, arousal, valence):
        return None

