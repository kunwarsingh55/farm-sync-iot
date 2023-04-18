from django.urls import path
from . import views

app_name = "dashbord"


urlpatterns=[
    path('', views.dashbord.as_view(), name = "dashbord"),
    path('pidata/', views.pi_data.as_view(), name = "pi_data"),
    path('temperature/', views.temperature.as_view(), name = "temperature"),
    path('humidity/', views.humidity.as_view(), name = "humidity"),
    path('moisture/', views.moisture.as_view(), name = "moisture"),


]