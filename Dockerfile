FROM node:15
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN npm install
COPY . ./
RUN npm run build
ENV PORT 3001
EXPOSE ${PORT}
CMD ["node", "build/src/app.js"]