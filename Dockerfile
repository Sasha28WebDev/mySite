FROM node

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . /app

CMD ["node","app.js"]

EXPOSE 3000