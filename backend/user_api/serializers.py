from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

from user_api.models import Post

UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
        )
        user_obj.username = validated_data['username']
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        user = authenticate(
            email=validated_data['email'],
            password=validated_data['password'],
        )
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username', 'user_id')


class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username',)


class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)  # Add this line

    class Meta:
        model = Post
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
