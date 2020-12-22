read -p "WEBHOOK_SECRET: " WEBHOOK_SECRET

docker run \
  --restart=unless-stopped \
  -d \
  --env WEBHOOK_SECRET=$WEBHOOK_SECRET \
  -p 9000:9000 \
  -v ${PWD}/webhook/:/etc/webhook \
  --name=webhook \
  almir/webhook \
  -verbose \
  -hooks=/etc/webhook/hooks.json \
  -hotreload