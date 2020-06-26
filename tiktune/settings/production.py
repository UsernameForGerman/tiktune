from .base import *

DEBUG = False

ALLOWED_HOSTS = ['tiktune.io', '45.143.138.48']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DATABASE_NAME'),
        'USER': os.environ.get('DATABASE_USER'),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD'),
        'HOST': os.environ.get('DATABASE_HOST'),
        'PORT': os.environ.get('DATABASE_PORT'),
    }
}

# Celery

BROKER_URL = os.environ.get('BROKER_URL')
CELERY_RESULT_BACKEND = os.environ.get('REDIS_URL')
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

# CORS staff
CORS_ORIGIN_WHITELIST = [
    "https://tiktune.io",
    "http://localhost:8000",
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'GET',
    'OPTIONS',
    'HEAD',
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
            'formatter': 'file',
        }
    },
    'loggers': {
        '': {
            'level': 'INFO',
            'handlers': ['file']
        }
    },
}

