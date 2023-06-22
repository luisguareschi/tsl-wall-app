from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegisterView.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user/', views.UserView.as_view(), name='user'),
    path('get_users/', views.get_users, name='get_users'),
    path('delete_user/', views.DeleteUserView.as_view(), name='delete_user'),
    path('get_posts/', views.GetPosts.as_view(), name='get_posts'),
    path('like_post/', views.LikePost.as_view(), name='like_post'),
    path('create_post/', views.CreatePost.as_view(), name='create_post'),
    path('get_user_posts/', views.GetUserPosts.as_view(), name='get_user_posts'),
    path('delete_post/', views.DeleteUserPost.as_view(), name='delete_post'),
]
