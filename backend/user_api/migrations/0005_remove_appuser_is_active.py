# Generated by Django 4.2.2 on 2023-06-19 20:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0004_appuser_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appuser',
            name='is_active',
        ),
    ]