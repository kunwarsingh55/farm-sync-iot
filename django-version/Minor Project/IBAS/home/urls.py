from django.urls import path, include
from . import views



app_name = 'home'

urlpatterns = [

    path('', views.home.as_view(), name = 'home'),
    path('login/', views.loginpage.as_view(), name = 'login'),
    path('logout/', views.logoutpage.as_view(), name = 'logout'),
    path('register/', views.register.as_view(), name = 'reg'),


]