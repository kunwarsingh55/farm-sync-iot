from django.shortcuts import render
from django.views import View
from django.middleware.csrf import get_token
from django.http import JsonResponse
from dashbord.models import SensorData
from django.views.generic import TemplateView




        

class dashbord(View):
    def get(self, request):
        #ctx = super().get_context_data(**kwargs)
        
        ctx = {"qs":''}
        ctx["qs"] =  SensorData.objects.all().order_by('-id')[:1]
        print(ctx['qs'])
        return render(request, 'dashbord/dashbord.html', ctx)
        


class temperature(View):
    def get(self, request):
        #ctx = super().get_context_data(**kwargs)
        
        ctxx = {"qs":''}
        ctxx["qs"] =  SensorData.objects.all().order_by('-id')[:10]
        print(ctxx['qs'])
        return render(request, 'dashbord/temperature.html', ctxx)

class humidity(View):
    def get(self, request):
        #ctx = super().get_context_data(**kwargs)
        
        ctx = {"qs":''}
        ctx["qs"] =  SensorData.objects.all().order_by('-id')[:10]
        #print(ctx['qs'])
        return render(request, 'dashbord/humidity.html', ctx)

class moisture(View):
    def get(self, request):
        #ctx = super().get_context_data(**kwargs)
        
        ctx = {"qs":''}
        ctx["qs"] =  SensorData.objects.all().order_by('-id')[:10]
        #print(ctx['qs'])
        return render(request, 'dashbord/moisture.html', ctx)

'''

class dashbord(TemplateView):
    template_name = 'dashbord/dashbord.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["qs"] =  SensorData.objects.all().order_by('-id')[:10]

        print (context)
        return context
'''

class pi_data(View):
    def get(self, request):
        get_token(request)
        
        data = [{
                
                'Get Request': 'OK'
                }]

        return JsonResponse(data, safe=False)


        
    
    def post(self, request):
        
        if request.POST.get('temp'):
            print(request.POST.get('temp'))
            x = SensorData(temperature=request.POST.get('temp'),time_stamp=request.POST.get('time'))
            x.save()


        respp = [{
                
                'Posted Data': 'Received'
                }]


        return JsonResponse(respp, safe=False)
        
