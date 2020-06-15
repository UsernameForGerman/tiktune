# tiktune

How to run server locally:
0. Get all requirements and run command:
"python -m pip install git+https://github.com/acrcloud/acrcloud_sdk_python"
1. Run Redis-server on localhost:6379
2. Run command "celery -A tiktune worker --loglevel=info" from project root
3. Run command "python manage.py migrate"
4. Run command "python manage.py runserver"

How to run frontend server:
0. Install Node.js
1. Install all dependencies via command : "npm i"
2. Run server by command : "npm run dev"