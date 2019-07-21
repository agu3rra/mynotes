class Publisher():

    def __init__(self):
        self.subscribers = dict()

    def subscribe(self, who, callback=None):
        if callback is None:
            callback = getattr(who, 'update')
        self.subscribers[who] = callback
    
    def unsubscribe(self, who):
        del self.subscribers[who]

    def broadcast(self, message):
        """
        Calls the callback function of each subscriber.
        Usually invoked when the publisher has finished doing something.
        """
        for subscriber, callback in self.subscribers.items():
            callback(message)
