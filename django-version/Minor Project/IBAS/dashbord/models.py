from django.db import models



class SensorData(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField(default=10)
    moisture = models.FloatField(default=10)
    time_stamp = models.CharField(max_length=128)

    def __str__(self):
        return "{}-{}-{}-{}".format(self.time_stamp, self.temperature, self.humidity, self.moisture)



