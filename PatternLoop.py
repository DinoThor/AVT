import datetime

class PatternLoop():

    def __init__(self, ds):
        self.dataService = ds

        self.arousal = []
        self.valence = []

    def getData(self, arousal, valence):
        self.arousal.append(arousal)
        self.valence.append(valence)

    def VectorLoop(self):
        arousalAvg = sum(self.arousal) / len(self.arousal)
        valenceAvg = sum(self.valence) / len(self.valence)
        instance   = datetime.datetime.now()
        event      = self.detectEvent(arousalAvg, valenceAvg)

        self.dataService.insertDetail(arousalAvg, valenceAvg, instance, event)

    """
        Return:
        Event || None
    """
    def detectEvent(self, arousal, valence):
        return None