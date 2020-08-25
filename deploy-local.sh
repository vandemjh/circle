# Raspberry pi is too slow to build using Docker...
ng build --configuration=local
rsync -ri --delete dist/circle/ pi@circle.local:/var/www/html/

# -v, --verbose               increase verbosity
# -r, --recursive             recurse into directories
# --delete                delete extraneous files from destination dirs
# --progress              show progress during transfer
# -i, --itemize-changes       output a change-summary for all updates