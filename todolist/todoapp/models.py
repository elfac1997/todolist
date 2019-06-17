from django.db import models


class Todoitems(models.Model):
    title = models.CharField(max_length=100)
    finished = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created',)

