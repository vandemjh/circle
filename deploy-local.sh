# Raspberry pi is too slow to build using Docker...
ng build --prod #--configuration=local
rsync -e "ssh -i ~/Downloads/Jack-Linux-Laptop.pem" \
-ri --delete \
--rsync-path="sudo rsync" \
dist/circle/ ubuntu@34.227.113.180:/var/www/html

# -v, --verbose               increase verbosity
# -r, --recursive             recurse into directories
# --delete                delete extraneous files from destination dirs
# --progress              show progress during transfer
# -i, --itemize-changes       output a change-summary for all updates
