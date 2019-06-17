from rest_framework import serializers
from todoapp.models import Todoitems

class TodoitemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todoitems
        fields = "__all__"
        #fields = ('id', 'title', 'finished','created')