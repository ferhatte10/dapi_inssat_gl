docker rmi --force $(docker images --no-trunc | grep "<none>" | awk '{print $3}' | cut -d':' -f2)