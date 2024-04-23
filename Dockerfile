# Etapa de construção
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de execução
FROM node:14 as production

WORKDIR /app

COPY --from=build /app/dist .

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", ".", "-l", "5000"]