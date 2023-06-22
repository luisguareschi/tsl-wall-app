from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser, Post


class AppUserAdmin(UserAdmin):
    # Custom admin class for AppUser model
    list_display = ('email', 'username', 'is_staff')
    list_filter = ('is_staff', 'is_superuser')
    search_fields = ('email', 'username')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'user', 'created_at', 'user_likes', 'image')
    list_filter = ('created_at', 'user_likes')
    search_fields = ('title', 'content', 'user')
    ordering = ('created_at',)


admin.site.register(AppUser, AppUserAdmin)
admin.site.register(Post, PostAdmin)
