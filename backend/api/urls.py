
from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('api/todos/', views.get_tasks, name='get_tasks'),  # GET request for tasks
    path('api/todos/add/', views.add_task, name='add_task'),  # POST request to add a task
]
