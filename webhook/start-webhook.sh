read -p "WEBHOOK_SECRET: " WEBHOOK_SECRET

docker run \
  -d \
  --env WEBHOOK_SECRET=$WEBHOOK_SECRET \
  --rm \
  -p 9000:9000 \
  -v ${PWD}/webhook/:/etc/webhook \
  --name=webhook \
  almir/webhook \
  -verbose \
  -hooks=/etc/webhook/hooks.json \
  -hotreload