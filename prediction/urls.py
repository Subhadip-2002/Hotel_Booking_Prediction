# prediction/urls.py
from django.urls import path
from .views import PredictBookingView

urlpatterns = [
    path('predict/', PredictBookingView.as_view(), name='predict_booking'),
]