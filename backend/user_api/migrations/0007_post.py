# Generated by Django 4.2.2 on 2023-06-21 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0006_appuser_is_staff'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('user', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_likes', models.TextField(default='[]')),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
            ],
        ),
    ]
