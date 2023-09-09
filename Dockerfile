FROM node:15
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
          then npm install; \
          else npm install; \
          fi
COPY . ./
ENV PORT 3001
EXPOSE ${PORT}
CMD ["node", "build/src/app.js"]
