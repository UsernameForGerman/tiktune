# tiktune

How to run server locally:
1. Run Redis-server on localhost:6379
2. Run command "celery -A tiktune worker --loglevel=info" from project root
3. Run command "python manage.py migrate"
4. Run command "python manage.py runserver"