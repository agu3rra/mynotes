# Django Basics: @Team Tree House

# Summary
<!-- TOC depthTo:2 -->

- [Django Basics: @Team Tree House](#django-basics-team-tree-house)
- [Summary](#summary)
- [Intro](#intro)
    - [Migrations](#migrations)
    - [SQLite3](#sqlite3)
    - [MVC 4 Django](#mvc-4-django)
    - [Hello World](#hello-world)
    - [Apps](#apps)
- [Model Administration](#model-administration)
    - [Creating a model](#creating-a-model)
    - [Using the model: Adding instances](#using-the-model-adding-instances)

<!-- /TOC -->

# Intro
The install of Django, also installs a handy *django-admin* application.
```bash
$ django-admin startproject my_web_app
```

This creates the basic `manage.py` and the site stub. Start server by running:   
```bash
$ python manage.py runserver 0.0.0.0:8000`
```

**HINT:** Execute `python manage.py` to get a list of available startup commands.

* Django has *templates* and *views* to render content.
* WSGI is our server interface.
* Django URL’s are created with *regular expressions*. Personal note: note really sure. It seems the latest version uses good old paths.

## Migrations
Migrations are a way of moving your database from one design to another.
```
$ python manage.py migrate
```

## SQLite3
This is a DB that ships together with Django for testing purposes.

## MVC 4 Django
* Django is a MVC framework, but it doesn't call its *templates* views or the functions that return the rendered template views controllers. Intead, for Django terminology:
    - views = templates
    - controllers = views

## Hello World
* create a views.py and add it to the *urls.py* boiler place code.
* launch the server.
* the tutorial shows django URL are built with regex, but it looks like the most recent update (Django2) doesn't accept it.

## Apps
Django has this concept of pluggable apps:
* app = self contained bid of functionality. Other Django projects could plug in and use a Django app you create.
* pluggable = Django apps that can be moved from project to project.
So a Django project is composed of 1+ apps.

```
$python manage.py startapp courses
```

Next, add your new app to the `settings.py` file under the *INSTALLED_APPS* array.  
To setup a timezone, edit the main *settings.py* in the corresponding field. Available timezones are listed in *pytz.all_timezones*.

# Model Administration
In Django's *ORM* (Object Relational Mapper), models are classes that represent database tables. Each model is its own table and each attribute in the class is a column in the table. New instances are new rows in the table:
* Django <<>>>> Database
* Model == Table
* Attributes == Columns
* Instances == Rows

## Creating a model
Editing *models.py* in our *courses* app.  
New class created by the name *Course*.  
Since we added a new table, we need to run the migration command once again: `python manage.py makemigrations courses`:
```terminal
Andres-MacBook-Pro:learning_site agu3rra$ python3 manage.py makemigrations courses
Migrations for 'courses':
  courses/migrations/0001_initial.py
    - Create model Course
```
Django automatically creates primary keys if none exist.
Now we need to run the migration: `python manage.py migrate courses`.  
Next: how do we make use of our newly created model?

## Using the model: Adding instances
Django has a shell command under its *manage.py* that opens a Python REPL like terminal and lets us explore its model: `python manage.py shell`.
```python
In [2]: from courses.models import Course
In [3]: Course.objects.all()
Out[3]: <QuerySet []>
In [4]: c = Course()
In [5]: c.title="Python Basics"
In [6]: c.description="Learning the basics of Python."
In [7]: c.save()
In [8]: Course.objects.all()
Out[8]: <QuerySet [<Course: Course object (1)>]>
```
**Verification:** What happens to the model is persisted to the database.

Example2: single line instance and saving.
```python
In [4]: Course(title="Python Collections", description="Learn about list, dict and tuple.").save()
In [5]: Course.objects.all()
Out[5]: <QuerySet [<Course: Course object (1)>, <Course: Course object (2)>]>
In [6]: Course.objects.create(title="Django ORM", description="Learn about the inner workings of the Django ORM")
Out[6]: <Course: Course object (3)>
```
