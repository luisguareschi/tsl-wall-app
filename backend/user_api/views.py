from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Post
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, PostSerializer, \
    CreatePostSerializer
from rest_framework import status, permissions
from rest_framework.decorators import api_view


# Create your views here.

class UserRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def get(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class DeleteUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        get_user_model().objects.filter(email=request.data['email']).delete()
        return Response(f'User {request.data["email"]} deleted')


class GetPosts(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        posts = Post.objects.all()
        posts = posts.order_by('created_at').reverse()
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class LikePost(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        post = Post.objects.get(id=request.data['post_id'])
        post.user_likes = request.data['user_likes']
        post.save()
        return Response(status=status.HTTP_200_OK)


class CreatePost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        user = request.user
        mutable_data = request.data.copy()
        mutable_data['user'] = user.user_id
        serializer = CreatePostSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserPosts(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user = get_user_model().objects.get(username=request.data['username'])
        posts = Post.objects.filter(user=user.user_id)
        posts = posts.order_by('created_at').reverse()
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteUserPost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        Post.objects.get(id=request.data['post_id']).delete()
        return Response(status=status.HTTP_200_OK)




@api_view(['GET'])
def get_users(request):
    users = get_user_model().objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
