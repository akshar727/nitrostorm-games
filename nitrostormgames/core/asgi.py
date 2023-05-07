import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import frontend.routing


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket' : AuthMiddlewareStack(
        URLRouter( 
            frontend.routing.websocket_urlpatterns
        )
    )
    # Just HTTP for now. (We can add other protocols later.)
})

app = application