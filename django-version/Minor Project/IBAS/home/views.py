from django.shortcuts import render, redirect
from django.views import View

from django.urls import reverse 

from django.http import HttpResponse

#import djando built-in usercreation from
from django.contrib.auth.forms import UserCreationForm
from . forms import CreateUserForm
from django.contrib.auth import authenticate, login, logout




class home(View):
    def get(self, request):
        return render(request, 'home/main.html')



class loginpage(View):

    def get(self, request):
        form = CreateUserForm()
        ctx = {'form':form}
        return render(request, 'home/login.html', ctx)

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard:dashbord')

class logoutpage(View):

    def get(self, request):
        logout(request)
        return redirect('home:home')



class register(View):
    

    def get(self, request):
        form = CreateUserForm()
        ctx = {'form':form}
        return render(request, 'home/register.html', ctx)

    def post(self, request):
        form = CreateUserForm(request.POST)
        if form.is_valid:
            form.save()
            return redirect('home:login')

