from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=100 ,null=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.name

