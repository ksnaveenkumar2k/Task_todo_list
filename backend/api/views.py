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
todos_collection = db['todos']  # Collection to store tasks


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
            'password': password,  # Storing password as is, without hashing
        })
        
        return JsonResponse({'message': 'User created successfully. Please log in!'}, status=201)

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

        if user['password'] == password:  # Compare passwords (use hashing in production)
            return JsonResponse({'message': 'Login successful', 'redirect': '/main'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def add_task(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        task = data.get('task')
        description = data.get('description')
        date = data.get('date')

        if not task or not description:
            return JsonResponse({'error': 'Task and description are required!'}, status=400)

        # Insert task with description into MongoDB
        todos_collection.insert_one({
            'task': task,
            'description': description,
            'date': date,
        })

        return JsonResponse({'message': 'Task added successfully!'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_tasks(request):
    if request.method == 'GET':
        tasks = list(todos_collection.find())
        for task in tasks:
            task['_id'] = str(task['_id'])  # Convert MongoDB ObjectId to string for JSON serialization
        return JsonResponse(tasks, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
