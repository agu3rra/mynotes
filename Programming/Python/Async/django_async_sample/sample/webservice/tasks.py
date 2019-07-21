from __future__ import absolute_import, unicode_literals
from celery import shared_task
import time

@shared_task
def sleeper(x):
    time.sleep(x)
    print('I have executed after {} seconds.'.format(x))
    