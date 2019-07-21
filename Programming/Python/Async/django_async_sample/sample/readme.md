<!-- TOC -->

- [Creating a simple endpoint in Django](#creating-a-simple-endpoint-in-django)
    - [Project creation](#project-creation)
    - [APIView](#apiview)
    - [Link APIView to endpoint URL](#link-apiview-to-endpoint-url)
    - [Run migrations](#run-migrations)
    - [Run demo server](#run-demo-server)
- [Celery](#celery)
    - [Required parts:](#required-parts)
    - [Message broker](#message-broker)
    - [pip install](#pip-install)
    - [Project settings](#project-settings)
    - [On the app](#on-the-app)
- [From SQLite to PostgreSQL](#from-sqlite-to-postgresql)

<!-- /TOC -->

# Creating a simple endpoint in Django

## Project creation
Run commands:
```
$ django-admin startproject sample
$ cd sample
$ python manage.py startapp webservice
```
Add the following to `settings.py`:
    'rest_framework',
    'webservice',

## APIView
Create an APIView inside the app folder under `views.py`:
```python
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

# Create your views here.
class SimpleSample(APIView):

    def get(self, request):
        response = {"response":"OK"}
        return Response(response, status=200)
```

## Link APIView to endpoint URL
Inside the project folder, under `urls.py`:
```python
from webservice.views import SimpleSample

urlpatterns = [
    path('sample/', SimpleSample.as_view())
]
```

## Run migrations
```
$ python manage.py makemigrations
$ python manage.py migrate
```

## Run demo server
```
$ python manage.py runserver
```

# Celery
Celery is a task queue implementation for Python web applications used to asynchronously execute work outside the HTTP request-response cycle.

References:
* https://docs.celeryproject.org/en/latest/getting-started/first-steps-with-celery.html#rabbitmq
* https://docs.celeryproject.org/en/latest/django/first-steps-with-django.html

## Required parts:
* Message Broker: like REDIS.
* Celery
* supervisor for celery server deployment

## Message broker
I've used RabbitMQ running on Docker:
```
$ docker run -d -p 5672:5672 rabbitmq
```
It comes pre-configured with `guest:guest` credentials.

## pip install
```
$ pip install djangorestframework
pip install celery
pip install django-celery-results
```

## Project settings
On __init__.py:
```python
from __future__ import absolute_import, unicode_literals

# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celery import app as celery_app

__all__ = ('celery_app',)
```

Create a `celery.py`:
```python
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sample.settings')

app = Celery('sample')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
```

On `settings.py`
```python
# Celery settings
CELERY_BROKER_URL = 'localhost'
CELERY_RESULT_BACKEND = 'django-db' # allows results to be reported to Django's ORM
CELERY_CACHE_BACKEND = 'django-cache'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

INSTALLED_APPS = [
    ...
    'rest_framework',
    'webservice',
    'django_celery_results',
]
```

## On the app
Create a `tasks.py`:
```python
from __future__ import absolute_import, unicode_literals
from celery import shared_task
import time

@shared_task
def sleeper(x):
    time.sleep(x)
    return 'I have executed after {} seconds.'.format(x)
```

On your `views.py`:
```python
from .tasks import sleeper

# Create your views here.
class SimpleSample(APIView):

    def get(self, request):
        sleeper.delay(10)
        response = {"response":"OK"}
        return Response(response, status=200)
```

# From SQLite to PostgreSQL
Open a PostgreSQL terminal: `psql``
```sql
CREATE USER sample_user WITH PASSWORD 'sample_password';
CREATE DATABASE sample_database WITH OWNER sample_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sample_user;
```

Update `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DB_NAME', ''),
        'USER': os.environ.get('DB_USER', ''),
        'PASSWORD': os.environ.get('DB_PASS', ''),
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Run migrations and application:
```
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py createsuperuser
$ python manage.py runserver
```
