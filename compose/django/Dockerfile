FROM python:3.6-slim

# Set env vars
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN apt-get update -y \
  # psycopg2 dependencies
  && apt-get install gcc -y \
  # && apt-get install g++ -y \
  && apt-get install libpq-dev -y
  # && apt-get install uwsgi -y \
  # && apt-get install uwsgi-plugin-python3 -y
  # for Django translations
  # && apt-get install gettext -y

RUN addgroup --system django \
    && adduser --system --group django --shell /bin/sh

WORKDIR /home/django/

RUN mkdir -p /home/django/app/
RUN mkdir -p /home/django/app/static
RUN mkdir -p /home/django/app/media
RUN mkdir -p /var/tiktune/static/
RUN mkdir -p /var/tiktune/media/

COPY ./requirements /requirements
RUN pip install --no-cache-dir -r /requirements/production.txt \
    && rm -rf /requirements

COPY ./compose/django/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

RUN chown django /entrypoint

COPY ./compose/django/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start
RUN chown django /start

COPY ./compose/django/celery/worker/start /start-celeryworker
RUN sed -i 's/\r//' /start-celeryworker
RUN chmod +x /start-celeryworker
RUN chown django /start-celeryworker

COPY ./compose/django/celery/beat/start /start-celerybeat
RUN sed -i 's/\r//' /start-celerybeat
RUN chmod +x /start-celerybeat
RUN chown django /start-celerybeat

COPY ./compose/django/celery/flower/start /start-flower
RUN sed -i 's/\r//' /start-flower
RUN chmod +x /start-flower
COPY . /app
# RUN chown -R django /app
# RUN chown django:django -R /home/django/

COPY ./backend /app
RUN chown -R django /app

# RUN chown -R django:django /var/tiktune

USER django

WORKDIR /app

ENTRYPOINT ["/entrypoint"]
