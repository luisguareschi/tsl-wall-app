from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import AppUser, Post


class APITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = AppUser.objects.create_user(email='test20@example.com', password='1234', username='testuser')
        self.client.force_authenticate(user=self.user)

    def test_user_registration(self):
        url = reverse('register')
        data = {'email': 'newuser@example.com', 'password': 'newpass', 'username': 'newuser'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AppUser.objects.count(), 2)  # Check if the user is created in the database

    def test_user_login(self):
        url = reverse('login')
        data = {'email': 'test20@example.com', 'password': '1234'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_posts(self):
        url = reverse('get_posts')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    #
    def test_create_post(self):
        url = reverse('create_post')
        data = {'title': 'Test Post', 'content': 'This is a test post'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)  # Check if the post is created in the database
