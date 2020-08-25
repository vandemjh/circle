# Raspberry pi is too slow to build using Docker...
ng build --configuration=local
ssh -T pi@circle.local << EOSSH
sudo rm -r /var/www/html/*
EOSSH
scp -r dist/circle/* pi@circle.local:/var/www/html
# ssh -T pi@circle.local << EOSSH
# sudo nginx -s reload
# EOSSH