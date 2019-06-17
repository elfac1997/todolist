from rest_framework.decorators import action
from rest_framework.views import APIView

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet, ViewSet
from todoapp.models import Todoitems
from todoapp.serializers import TodoitemsSerializer
from rest_framework import generics, mixins
from rest_framework.pagination import  CursorPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django_filters import rest_framework
from rest_framework.response import Response


class MyPagination(CursorPagination):
    cursor_query_param = 'cursor'
    page_size = 7
    page_size_query_param = None
    max_page_size = None



class TodoDetailViewSet(ModelViewSet):
    queryset = Todoitems.objects.all()
    serializer_class = TodoitemsSerializer
    pagination_class = MyPagination

    @action(methods=['get'],detail=False)
    def get_unfinished(self,request):  # 接口 http://127.0.0.1:8000/todolist/get_unfinished/
        queryset = Todoitems.objects.filter(finished=False)
        pg = MyPagination()
        pager = pg.paginate_queryset(queryset=queryset,request=request,view=self)
        ser = TodoitemsSerializer(instance=pager,many=True)
        return pg.get_paginated_response(ser.data)

    @action(methods=['get'], detail=False)
    def get_finished(self, request):  # 接口 http://127.0.0.1:8000/todolist/get_finished/
        queryset = Todoitems.objects.filter(finished=True)
        pg = MyPagination()
        pager = pg.paginate_queryset(queryset=queryset, request=request, view=self)
        ser = TodoitemsSerializer(instance=pager, many=True)
        return pg.get_paginated_response(ser.data)
