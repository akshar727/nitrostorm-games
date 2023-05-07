import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from .models import *
from django.contrib.auth import authenticate, login as login_user, logout as logout_user

# Create your views here.


def home(request):
    return render(request,"frontend/index.html")


def chat_menu(request):
    return render(request, "frontend/chats.html")


def room(request):
    return render(request, "frontend/chatRoom.html")


def about(request):
    return render(request, "frontend/about.html")

def login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("home"))
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        print(email)
        print(password)
        # try and authenticate the user
        user = authenticate(request,username=email, password=password)
        if user is not None:
            login_user(request,user)
            return JsonResponse({"login":True})
        else:
            return JsonResponse({"login":False})
    return render(request, "frontend/login.html")


def logout(request):
    if request.user.is_authenticated:
        logout_user(request)
    return HttpResponseRedirect(reverse("home"))
    

def get_serialized_product(product):
    return {
        'name': product.name,
        'price': product.price,
        'src': product.src,
        'websocket': product.websocket,
        'uuid': product.uuid
    }

# The all_products method gets all of the products in the database and then creates a list of serialized products to return. It is used to get all of the products in the database and return them as JSON.

def all_products(request):
    products = Product.objects.all()
    serialized_products = [get_serialized_product(product) for product in products]
    return JsonResponse({'products':serialized_products})


def my_cart(request):
    return render(request, "frontend/cart.html")

def cart(request):
    if (request.method) == "PUT":
        product = Product.objects.get(uuid=request.GET.get("uuid"))
        request.user.cart.add(product)
        return JsonResponse({"success":True})
    elif (request.method) == "DELETE":
        product = Product.objects.get(uuid=request.GET.get("uuid"))
        request.user.cart.remove(product)
        return JsonResponse({"success":True})
    elif (request.method) == "GET":
        products = request.user.cart.all()
        serialized_products = [get_serialized_product(product) for product in products]
        return JsonResponse({'products':serialized_products})
    else:
        return JsonResponse({"success":False})
