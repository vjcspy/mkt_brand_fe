FROM node:12

# Install pm2
RUN npm install pm2 -g

# Expose ports needed to use Keymetrics.io
EXPOSE 43554 3000 1341 3041

# Bundle APP files
COPY . /app

WORKDIR /app

CMD [ "pm2-runtime", "start", "deploy.json" ]
