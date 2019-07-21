# Django Unleashed
by Andrew Pinkham  
Published Nov 23rd 2015  
Uses Django 1.8.

# Index
<!-- TOC -->

- [Django Unleashed](#django-unleashed)
- [Index](#index)
- [Chapter 1](#chapter-1)
    - [Basic flow of a web app access:](#basic-flow-of-a-web-app-access)
    - [Frameworks](#frameworks)
    - [Model-View-Controller Architecture](#model-view-controller-architecture)
    - [The project for this book: A Blog](#the-project-for-this-book-a-blog)
    - [Creating a new Django Project and Apps](#creating-a-new-django-project-and-apps)
    - [The project folder structure](#the-project-folder-structure)
    - [Invoking the dev server](#invoking-the-dev-server)
    - [New Apps](#new-apps)
    - [Linking new apps to our Django project](#linking-new-apps-to-our-django-project)
- [Chapter 2](#chapter-2)
    - [Creating and Integrating a New App](#creating-and-integrating-a-new-app)
    - [Webpage Data](#webpage-data)
    - [Linking data to URL's](#linking-data-to-urls)
    - [Removing an app](#removing-an-app)
- [Chapter 3: Programming Django Models](#chapter-3-programming-django-models)
    - [Why use DB's](#why-use-dbs)
    - [Organizing your data](#organizing-your-data)

<!-- /TOC -->

# Chapter 1
*"The web framework for perfectionists with dead-lines."*  
Initial release: 2005.  
Notable projects powered by Django: Pinterest, Instagram, The Onion.  
Follows the DRY (Don't Repeat Yourself) principle.  
It does not help built front-end behavior. Hence the need for you to master JavaScript. It is a back-end framework, only half of a modern website.  
**Nice personal development project**:
1. Learn Django to get a job as a back-end developer.
2. Learn JavaScript, TypeScript and ReactJS to become a full-stack developer (the missing front-end piece).

Django started supporting Python3 as of version 1.6 in Nov 2013.

## Basic flow of a web app access:
1. User's browser issues request.
2. Server (back-end) generates/sends a markup file and points user to associated content (JavaScript and CSS files).
3. User's browser combines everything and provides a front-end to the user to interact with.

## Frameworks
*Definition*: a large codebase meant to provide universal, reusable behavior for a targeted project.

Main advantages:
* removal of tedious and repetitive tasks.
* **inversion of control**: the developer adds or extends code in specific locations to customize the framework to fit the target project. The framework, not the developer dictates the control flow.
* security

Caveats:
* *Holistic understanding*: overhead of learning the framework's behavior so that a maintainable code base is created for the target project.
* "Don't fight the framework."

## Model-View-Controller Architecture
Django is built on top of that:
* **Model**: controls the organization and storage of data as well as its behavior.
* **View**: controls how data is displayed, generating the output that is presented to the user.
* **Controller**: the glue between the model and the view.

In Django's terminology:
* Templates map to MVC views. - MVC view = Django template
* Views and URL configs are the acting MVC controller. - MVC Controller = Django view

## The project for this book: A Blog
Given the approachable nature of it.  
A blog is a list of articles (posts), published on a single site and organized by date.  
This blog will be about technology startup businesses.

## Creating a new Django Project and Apps
* Project structure: boiler plate code automatically generated when your start a project.
```bash
$ django-admin startproject suorganizer
$ python manage.py # lists available manager options
```

## The project folder structure
* *suorganizer*: The corresponding project folder contains project wide settings and config files.
* *settings.py*: contains all site settings, including but not limited to:
	* timezone. Check available ones using `pytz.all_timezones`.
	* database configs
	* key for cryptographic hashing
	* locations of files
* *urls.py*: Lists of all URL for the site and how to handle each one.
* *wsgi.py*: Web Server Gateway Interface (WSGI). Django's development server.

## Invoking the dev server
```bash
$ python manage.py migrate
$ python manage.py runserver 0.0.0.0
```

## New Apps
In Django, a project is made of any number of apps. Think of a *project* as a *website* and the *apps* as *features*. For this book's project, we'll have 2 features:
1. an organizer of startups by tag
2. a blog
So we invoke:
```
$ python manage.py startapp organizer
$ python manage.py startapp blog
```

## Linking new apps to our Django project
This is done in the main `settings.py` file by adding the apps to the `INSTALLED_APPS` array.

# Chapter 2
## Creating and Integrating a New App
* A new sample *hello* app was created and add to the list of installed apps.

## Webpage Data
These are typically stored in the *views.py* file of any app (remember the django view maps to a MVC controller).  
So our first action is to create a *function view* in the correspoing *views.py* are of the app:
```python
from django.http import HttpResponse


def greeting(request):
    message = 'Hello there from Django!\n' \
              'The request Django has sent me was: {}' \
              .format(request)
    return HttpResponse(message)
```
In the above code snippet, Django actually handles the sending of the request variable for you (yes another evidence of the *inversion of control*).

## Linking data to URL's

Moving forward we now have data to be returned, so we need to link it to an URL. This is done via, yes you guessed it, the *urls.py* file. For this example, we'll use the file in the project wide settings. Chapter 5 will work on app specific URL's.
```python
from django.contrib import admin
from django.urls import path
from hello.views import greeting

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', greeting) # map to root
]
```
*Observation*: the book tells you to use `r'^$'` as the pattern to match the site's root directory, but Django does not find it. Perhaps this was the case pre version 2. Reding through the documentation, I found that the `re_path`is used to handle pattern type URL's, like so:
```python
from django.contrib import admin
from django.urls import path
from django.urls import re_path
from hello.views import greeting

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', greeting) # this one works!
]
```

## Removing an app
Since we have only created the *hello* app for the sake of exercise, we are now removing it from our project:
* Delete the URL pattern from *urls.py*.
* Remove app from *settings.py* `INSTALLED_APPS`.
* Delete the app's directory.

App encapsulation is what allows us to easily add/remove features from our project, but this is not enforced by Django. One should always strive to make apps as independent as possible though this is not always possible according to the book (really?).

# Chapter 3: Programming Django Models
Typically the 1st step to building a Django project is to define how the data are organized and then work to build the database (so we likelly create the app, then DB classes in Django).

## Why use DB's
* Avoid content hardcoding;
* Rapid access to persistent, normalized data.
* Separation of data from behavior allows for multiple computers to act as a single application (scalability).

We need to split a web app into 2 discrete parts:
1. The stateful data (disk)
2. The stateless process (memory)

## Organizing your data
Begin by listing the behaviors you wish, not by coding the models. In our blog example:
* List startup organizations.
* Organize them by tags of labels.
* Link to external sources.
* Write blog posts about startups.

For this we need 4 entities:
* Startup
* Tag
* News link
* Blog post

Then come up with the attributes of each entity. There you have your database structure and in the case of Django they will be represented by a model.