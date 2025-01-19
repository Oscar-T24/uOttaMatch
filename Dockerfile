# Step 1: Base image for Python backend
FROM python:3.10-slim AS backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory for backend
WORKDIR /api

# Install Python dependencies
COPY ./requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY . /app/backend

# Step 2: Base image for Node.js frontend
FROM node:18 AS frontend

# Set working directory for frontend
WORKDIR /client

# Copy frontend files
COPY . /app/frontend

# Install frontend dependencies
RUN npm install

# Step 3: Final image for development mode
FROM python:3.10-slim

# Copy backend and frontend from the build stages
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/frontend /app/frontend

# Expose ports for Flask (5000) and React (3000)
EXPOSE 5000 3000

# Set working directory for the container
WORKDIR /app

# Default command to run both processes
CMD [ "sh", "-c", "cd /app/backend && python -m flask run --host=0.0.0.0 & cd /app/frontend && npm run dev -- --host" ]
