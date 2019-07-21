from django.db import models

# Create your models here.
class Course(models.Model):
    created_at = models.DateTimeField(auto_now_add=True) #add now depends on the timezone at settings.py
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return "Title: {0}\nDescription: {1}\nCreated at: {2}\n".format(
            self.title, self.description, self.created_at)