from .base import *

DEBUG = False

ALLOWED_HOSTS = ['.vercel.app', '.now.sh', '127.0.0.1']

DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("POSTGRES_DATABASE"), 
        'USER': os.getenv("POSTGRES_USER"),
        'PASSWORD': os.getenv("POSTGRES_PASSWORD"),
        'HOST': os.getenv("POSTGRES_HOST"), 
        'PORT': os.getenv("POSTGRES_PORT"),
    }
}

STATICFILES_DIRS = os.path.join(BASE_DIR, 'static'),
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles_build', 'static')

MEDIA_ROOT = os.path.join(BASE_DIR, 'static_cdn', 'media_root')
