# tiktune

How to run server locally:
1. Get all requirements and run command:
"python -m pip install git+https://github.com/acrcloud/acrcloud_sdk_python"
2. cat packages.txt | xargs sudo apt-get install
3. Run Redis-server on localhost:6379
4. Run command "celery -A tiktune worker --loglevel=info" from project root
5. Run command "python manage.py migrate"
6. Run command "python manage.py runserver"

How to run frontend server:
1. Install Node.js
2. Install all dependencies via command : "npm i"
3. Run server by command : "npm run dev"