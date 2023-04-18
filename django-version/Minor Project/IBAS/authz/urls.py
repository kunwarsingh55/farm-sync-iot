from django.urls import path, include
from . import views
from django.views.generic import TemplateView

app_name = 'authz'


urlpatterns = [

    path('' , TemplateView.as_view(template_name='authz/main.html')),
    path('open/' , views.open.as_view(),    name= 'open'),
    path('apereo/' , views.open.as_view(),  name= 'apereo'),
    path('manual/' , views.manual.as_view(),  name= 'manual'),
    path('protect/' , views.protect.as_view(), name= 'protect'),
    path('python/' , views.open.as_view(),  name= 'python'),

   
]