from rest_framework import serializers
from .models import BookingRequest

class BookingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingRequest
        fields = '_all_'