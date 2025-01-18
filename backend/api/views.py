from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import pymongo
import json

# MongoDB Atlas connection
client = pymongo.MongoClient("mongodb+srv://naveensanthosh1213:KSNaveen%402000@todolist.i7p0w.mongodb.net/")  # Replace with your MongoDB Atlas URI
db = client['todo_list']  # Replace with your database name
user_collection = db['user_login']  # Example collection for users

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Check if the user already exists in MongoDB
        if user_collection.find_one({'username': username}):
            return JsonResponse({'error': 'Username already exists'}, status=400)
        
        if user_collection.find_one({'email': email}):
            return JsonResponse({'error': 'Email already exists'}, status=400)
        
        # Create user in MongoDB
        user_collection.insert_one({
            'username': username,
            'email': email,
            'password': password,  # Hash this for better security
        })
        return JsonResponse({'message': 'User created successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Authenticate user using MongoDB
        user = user_collection.find_one({'email': email})
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)

        if user['password'] == password:  # Compare hashed passwords in production
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
