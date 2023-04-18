from django.shortcuts import render, redirect
from django.views import View
# Create your views here.
from django.utils.http import urlencode
from django.urls import reverse
from django.contrib.auth.mixins import LoginRequiredMixin



class open(View):
    def get(self, request):
        return render (request, 'authz/open.html')

class apereo(View):
    def get(self, request):
        pass

class manual(View):
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, 'authz/main.html')

        loginurl = reverse('login')+'?'+urlencode({'next':request.path})
        return redirect(loginurl)

class protect(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'authz/main.html')

class python(View):
    def get(self, request):
        pass

