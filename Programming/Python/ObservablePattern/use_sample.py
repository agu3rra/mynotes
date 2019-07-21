from publisher import Publisher
from subscriber import Subscriber, DifferentSubscriber

andre = Subscriber('Andre')
ivan = Subscriber('Ivan')
igor = DifferentSubscriber('Igor')
oki = DifferentSubscriber('Oki')

pub = Publisher()

pub.subscribe(andre)
pub.subscribe(ivan)
pub.subscribe(igor, igor.mycallback)
pub.subscribe(oki, oki.mycallback)

pub.broadcast('Hello all!')

pub.unsubscribe(oki)

pub.broadcast('Bye!')
