#!/bin/bash

# ========================================
# HRM-LITE v2 - Docker Management Script
# ========================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Config
COMPOSE_FILE="docker-compose.v2.yml"
ENV_FILE=".env.v2"

# Functions
print_header() {
    echo -e "${BLUE}"
    echo "=========================================="
    echo "  HRM-LITE v2 - Docker Management"
    echo "=========================================="
    echo -e "${NC}"
}

check_env() {
    if [ ! -f "$ENV_FILE" ]; then
        echo -e "${YELLOW}Warning: $ENV_FILE not found. Creating from example...${NC}"
        cp .env.v2.example $ENV_FILE
        echo -e "${GREEN}Created $ENV_FILE - please update with your values${NC}"
    fi
}

build() {
    echo -e "${BLUE}Building images...${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE build --no-cache
    echo -e "${GREEN}Build completed!${NC}"
}

start() {
    echo -e "${BLUE}Starting HRM-LITE v2...${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE up -d
    echo -e "${GREEN}Services started!${NC}"
    echo ""
    echo -e "Frontend: ${GREEN}http://localhost${NC}"
    echo -e "Backend:  ${GREEN}http://localhost:3001/api${NC}"
    echo -e "Health:   ${GREEN}http://localhost:3001/api/health${NC}"
}

start_with_tools() {
    echo -e "${BLUE}Starting HRM-LITE v2 with tools...${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE --profile tools up -d
    echo -e "${GREEN}Services started with tools!${NC}"
    echo ""
    echo -e "Frontend: ${GREEN}http://localhost${NC}"
    echo -e "Backend:  ${GREEN}http://localhost:3001/api${NC}"
    echo -e "Adminer:  ${GREEN}http://localhost:8080${NC}"
}

stop() {
    echo -e "${YELLOW}Stopping HRM-LITE v2...${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE down
    echo -e "${GREEN}Services stopped!${NC}"
}

restart() {
    stop
    start
}

logs() {
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE logs -f "$@"
}

status() {
    echo -e "${BLUE}Service Status:${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE ps
}

clean() {
    echo -e "${RED}Cleaning up (removing volumes)...${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE down -v --remove-orphans
    echo -e "${GREEN}Cleanup completed!${NC}"
}

migrate() {
    echo -e "${BLUE}Running database migrations...${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE exec backend npx prisma db push
    echo -e "${GREEN}Migrations completed!${NC}"
}

seed() {
    echo -e "${BLUE}Seeding database...${NC}"
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE exec backend npx prisma db seed
    echo -e "${GREEN}Seeding completed!${NC}"
}

shell_backend() {
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE exec backend sh
}

shell_db() {
    docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE exec postgres psql -U hrmlite -d hrm_lite
}

# Main
print_header
check_env

case "$1" in
    build)
        build
        ;;
    start)
        start
        ;;
    start-tools)
        start_with_tools
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        shift
        logs "$@"
        ;;
    status)
        status
        ;;
    clean)
        clean
        ;;
    migrate)
        migrate
        ;;
    seed)
        seed
        ;;
    shell-backend)
        shell_backend
        ;;
    shell-db)
        shell_db
        ;;
    *)
        echo "Usage: $0 {build|start|start-tools|stop|restart|logs|status|clean|migrate|seed|shell-backend|shell-db}"
        echo ""
        echo "Commands:"
        echo "  build         Build Docker images"
        echo "  start         Start all services"
        echo "  start-tools   Start with Adminer (DB tool)"
        echo "  stop          Stop all services"
        echo "  restart       Restart all services"
        echo "  logs [svc]    View logs (optional: service name)"
        echo "  status        Show service status"
        echo "  clean         Stop and remove volumes"
        echo "  migrate       Run database migrations"
        echo "  seed          Seed the database"
        echo "  shell-backend Enter backend container shell"
        echo "  shell-db      Enter PostgreSQL shell"
        exit 1
        ;;
esac
