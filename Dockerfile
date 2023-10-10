# Utiliza una imagen oficial de Node.js como base
FROM node:18 AS builder

# Establece el directorio de trabajo en el contenedor
RUN npm i -g node-gyp
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --production --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY . .

# Construye la aplicación Next.js
RUN yarn build

# Utiliza una nueva etapa para reducir el tamaño de la imagen final
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia las dependencias y el código construido desde la etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Exponer el puerto en el que se ejecutará tu aplicación (por defecto Next.js usa el 3000)
EXPOSE 8080

ENV PORT 8080

# Comando para ejecutar la aplicación
CMD ["yarn", "start"]
