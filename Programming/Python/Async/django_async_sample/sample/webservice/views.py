from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import time
from .tasks import sleeper

# Create your views here.
class SimpleSample(APIView):

    def get(self, request):
        sleeper.delay(10)
        response = {"response":"OK"}
        return Response(response, status=200)