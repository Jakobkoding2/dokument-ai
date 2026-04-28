FROM node:20-slim

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-nor \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production
COPY . .
RUN mkdir -p /tmp/dokument-ai
EXPOSE 3001
CMD ["node", "index.js"]
