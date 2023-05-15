import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from frontend.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket' : AuthMiddlewareStack(
        URLRouter( 
            websocket_urlpatterns
        )
    )
    # Just HTTP for now. (We can add other protocols later.)
})

