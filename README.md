
# CLI

Usage: 

Inside the `pvl/cli` directory, there's a `cvcsv` command file.

- To convert csv to json, run `./cvcsv json <file path>`. 
    - E.g. `./cvcsv json test/standard.csv`
- To convert csv to xml, run `./cvcsv xml <file path>`.
    - E.g. `./cvcsv xml test/standard.csv`

The result files will be saved to `pvl/cli/output/data.json` or `pvl/cli/output/data.xml`. 
The new files will overwrite the old ones.

To improve:

- Further file validations such as file not being too large, id being unique, image being a valid url, 
discount_percentage being a number between 1 and 100 etc.. are needed
- The solution could be made more generic
- Error handling could be better



# API


The API serves content of the json data file `data.json` at 

`pvl/api/storage/app/data.json`

To serve the application at http://localhost:8000, run

`cd pvl/api`

`php -S localhost:8000 -t public`


Note:
- PHP version 7.3 
- Using Lumen framework by Laravel
- CORS is disabled for easy access. This needs to be enable in real applications.


To improve:
- API should only accept XMLHttpRequest
- Need to have authentication with JWT


# UI

The API must be running at http://localhost:8000 for this to work.

To serve the UI application at http://localhost:8080, run

`cd pvl/ui`

`npm install`

`npm run serve`

To create a production build, run 

`npm run build`

Note:
- The solution is designed for image of size 250x250px based on data in the CSV example. 
I planned to make the image size configurable but ran out of time.
- I use Quasar components and style to assist with elements other than the carousel.
- I assumed the "id" for each record returned by the API is unique.

To improve:

- Need to set 'X-Requested-With': 'XMLHttpRequest' in request header
- Select empty value for venue means no filter. This should displays "All".
- Should allow selection of multiple venues.
- Need to split the vue store into separate files and modules.
- The solution can be made more generic by using a css variable for image size, 
and applying calculation in the css for responsiveness of the images.
- Can add auto-slide feature
- Can add animation 
- Can add swipe feature for mobile
