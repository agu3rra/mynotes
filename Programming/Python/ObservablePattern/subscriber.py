class Subscriber():

    def __init__(self, name):
        self.name = name
    
    def update(self, message):
        print('{0} got message: {1}'.format(self.name, message))

class DifferentSubscriber():
    def __init__(self, name):
        self.name = name
    
    def mycallback(self, message):
        print('I, {0}, have received: {1}'.format(self.name, message))
