FROM nginx:alpine

COPY ./nginx /etc/nginx/conf.d

RUN ls /usr/share/nginx/html

RUN rm /usr/share/nginx/html/*

RUN ls /usr/share/nginx/html

WORKDIR /frontend

# COPY --from=build-stage /frontend/build /frontend/build

RUN ls
RUN ls ./
RUN ls /frontend
RUN ls /frontend/build
#RUN addgroup --system nginx \
#    && adduser --system --group nginx --shell /bin/sh

#WORKDIR /home/nginx/

#COPY ./nginx /etc/nginx/conf.d
#RUN chown -R nginx:nginx /etc/nginx/conf.d
#
#USER nginx
