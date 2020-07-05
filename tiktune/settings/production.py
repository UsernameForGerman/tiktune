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


# CELERY
# ------------------------------------------------------------------------------
BROKER_URL = os.environ.get('BROKER_URL')
CELERY_RESULT_BACKEND = os.environ.get('REDIS_URL')
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'


# CORS
# ------------------------------------------------------------------------------
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

# EMAIL SETTINGS
# ------------------------------------------------------------------------------
# MAILER_LIST = [os.environ.get('MAILER_LIST_USER', None)]
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', None)
# EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', None)
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', None)


# LOGGING
# ------------------------------------------------------------------------------
# ADMINS = [(os.environ.get('ADMIN_NAME', None), os.environ.get('ADMIN_EMAIL', None))]

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
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'django.log',
            'maxBytes': 5*1024*1024,
            'backupCount': 1,
            'formatter': 'file',
        },
        # 'mail_admins': {
        #     'level': 'WARNING',
        #     'class': 'django.utils.log.AdminEmailHandler',
        #     'email_backend': 'django.core.mail.backends.smtp.EmailBackend',
        #     'include_html': True,
        # }
    },
    'loggers': {
        'django': {
            'level': 'INFO',
            # 'handlers': ['file', 'mail_admins']
            'handlers': ['file']
        },
    },
}

