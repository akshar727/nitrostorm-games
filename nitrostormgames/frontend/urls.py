"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from .models import Product
from . import views
from django.conf.urls import handler404

urlpatterns = [
    path("", views.home,name="home"),
    path("about/", views.about,name="about"),
    path("login/", views.login,name="login"),
    path("signup/", views.signup,name="signup"),
    path("checkout/", views.checkout,name="checkout"),
    path("cart/", views.my_cart,name="my_cart"),
    path("purchases/", views.purchases,name="purchases"),
    path("logout/", views.logout,name="logout"),
    path("api/all-products/", views.all_products,name="all_products"),
    path("api/my-cart/", views.cart_api,name="api_cart"),
    path("api/purchases/", views.user_purchases,name="api_purchases"),
    path("chats/", views.chat_menu,name="chats"),

]

for p in Product.objects.all():
    urlpatterns.append(path(f"chat/{p.websocket}/", views.room, name=p.websocket))

handler404 = "frontend.views.error_404"