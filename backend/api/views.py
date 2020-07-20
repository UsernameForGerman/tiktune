from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from django.db.models import F
from .models import Visits
# Create your views here.

class VisitView(APIView):

    def post(self, *args, **kwargs):
        Visits.objects.update(visits=F('visits') + 1)
        print(Visits.objects.all())
        return Response(status=HTTP_201_CREATED)
