FROM node:15
WORKDIR /app
COPY package.json .
ARG NODE_ENV
COPY . ./
ENV PORT 3001
EXPOSE ${PORT}
CMD ["node", "build/src/app.js"]
