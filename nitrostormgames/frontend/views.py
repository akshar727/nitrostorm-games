import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from .models import *
import requests
from django.contrib.auth import authenticate, login as login_user, logout as logout_user

# Create your views here.

def get_paypal_access_token():

    url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"

    payload = 'grant_type=client_credentials&ignoreCache=true&return_authn_schemes=true&return_client_metadata=true&return_unconsented_scopes=true'
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic QVV2OHJyY19QLUViUDJFMG1wYjQ5QlY3ckZ0M1Vzci12ZFVaTzhWR09ualJlaEdIQlhrU3pjaHIzN1NZRjJHTmRRRllTcDcyamg1UVVoekc6RU1uQVdlMDZpb0d0b3VKczdnTFlUOWNoSzktMmpKLS03TUtSWHBJOEZlc21ZXzJLcC1kXzdhQ3FmZjdNOW1vRUpCdnVYb0JPNGNsS3RZMHY='
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(json.loads(response.text)['access_token']) 




def createUser(email, password, first_name, last_name):
    try:
        user = User.objects.create_user(email=email,
                                        password=password
                                        , first_name=first_name
                                        , last_name=last_name
                                        , username=email
                                        , is_active=True
                                        )
        user.save()
    except Exception as e:
        return False
    return user



def purchases(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    if request.method == "POST":

        purchases = request.user.purchases.all()
        return JsonResponse({"purchases":purchases})
    return render(request, "frontend/purchases.html")


def checkout(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    if request.method == "POST":
        data = json.loads(request.body)
        cart = request.user.cart.all()
        p = Purchase.objects.create(user=request.user, content=cart, cost=data.get("total"))
        p.save()
        request.user.cart.clear()
        return JsonResponse({"success":True})
    return render(request, "frontend/checkout.html")

def signup(request):
    if request.method == "POST":
        # get the data from the request
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        first_name, last_name = data.get("name").split(" ")
        # check if the user already exists
        if User.objects.filter(email=email).exists():
            return JsonResponse({"signup":False, "error":"EMAIL"})
        if first_name == "" or last_name == "":
            return JsonResponse({"signup":False, "error":"NAME"})
        # create the user
        user = createUser(email, password, first_name,
                   last_name)
        # login the user
        # login_user(request,user)
        return JsonResponse({"signup":True})
    return render(request, "frontend/signup.html")

def error_404(request, exception):
    return render(request,"frontend/404.html",status=404)

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
    

def get_serialized_product(product,user):
    return {
        'name': product.name,
        'price': product.price,
        'src': product.src,
        'websocket': product.websocket,
        'uuid': product.uuid,
        'owned': is_owned(product,user)
    }

# The all_products method gets all of the products in the database and then creates a list of serialized products to return. It is used to get all of the products in the database and return them as JSON.

def all_products(request):
    products = Product.objects.all()
    serialized_products = [get_serialized_product(product,request.user) for product in products]
    return JsonResponse({'products':serialized_products})


def get_purchase_content(purchase):
    start = {"content":[], "date":purchase.date.strftime("%m/%d/%Y")}
    for product in purchase.content.all():
        start['content'].append(
            {
                "download_url": product.download_url,
                "name":product.name,
            }
        )
    return start


def is_owned(product,user):
    purchases = user.purchases.all()
    for purchase in purchases:
        if product in purchase.content.all():
            print("a")
            return True
    return False

def user_purchases(request):
    purchases = request.user.purchases.all()
    start = []
    for purchase in purchases:
        start.append(get_purchase_content(purchase))
    return JsonResponse(start,safe=False)

def my_cart(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    return render(request, "frontend/cart.html")

def cart_api(request):
    if (request.method) == "PUT":
        if not request.user.is_authenticated:
            return JsonResponse({"success":False, "error":"AUTH"})
        product = Product.objects.get(uuid=json.loads(request.body).get("uuid"))
        # check if product is already in cart
        if product in request.user.cart.all():
            return JsonResponse({"success":False, "error":"DUPLICATE"})
        request.user.cart.add(product)
        return JsonResponse({"success":True})
    elif (request.method) == "DELETE":
        if not request.user.is_authenticated:
            return JsonResponse({"success":False, "error":"AUTH"})
        product = Product.objects.get(uuid=json.loads(request.body).get("uuid"))
        if not product in request.user.cart.all():
            return JsonResponse({"success":False, "error":"NOT_IN_CART"})
        request.user.cart.remove(product)
        return JsonResponse({"success":True})
    elif (request.method) == "GET":
        if not request.user.is_authenticated:
            return JsonResponse({"success":False, "error":"AUTH"})
        products = request.user.cart.all()
        serialized_products = [get_serialized_product(product,request.user) for product in products]
        return JsonResponse({'cart':serialized_products})
    else:
        return JsonResponse({"success":False})
