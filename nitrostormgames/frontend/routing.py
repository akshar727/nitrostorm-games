from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path(r'ws/chat/turtleClicker/', consumers.ChatRoomConsumer.as_asgi()),
    path(r'ws/chat/sesordle/', consumers.ChatRoomConsumer.as_asgi()),
    path(r'ws/chat/turretOverload/', consumers.ChatRoomConsumer.as_asgi()),
    path(r'ws/chat/milkman/', consumers.ChatRoomConsumer.as_asgi()),
    path(r'ws/chat/robot/', consumers.ChatRoomConsumer.as_asgi()),
]
