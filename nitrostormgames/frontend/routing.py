from django.urls import path
from .models import Product

from . import consumers


websocket_urlpatterns = [
    path(f"ws/chat/{p.websocket}/", consumers.ChatRoomConsumer.as_asgi()) for p in Product.objects.all()
]
