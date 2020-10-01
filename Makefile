build: ## Docker build
		docker build -t tsoftglobal/teom-proxy:latest nginx/.
		docker build -t tsoftglobal/teom:latest .

init: ## Swarm init
		docker swarm init

leave: ## Swarm leave
		docker swarm leave -f

deploy: ## Stack deploy
		docker stack deploy -c stack.yml sre

remove: ## Stack deploy
		docker stack rm sre

prune: ## Docker prune
		docker system prune -f

start: build init deploy ## Enable services

stop: remove leave prune ## Disable services