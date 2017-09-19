const Finder = require( 'fs-finder' );
const csv = require( 'csvtojson' );
const Utils = require( './utils.js' );

const csvOptions = {
    delimiter: "||"
}

//Search ".csv" files in "/input" directory and make an array of found files
const inputFiles = Finder
    .from( __dirname + "/input" )
    .findFiles( '*.csv' );

//Exit program if there is no ".csv" files
if ( !inputFiles || inputFiles.length === 0 ) {
    console.log( "Error: No '.csv' files found in '/input' drectory" );
    return;
}

//Iter all found files and convert them to ".json"
inputFiles.forEach( file => {
    const parsedItems = [];
    csv( csvOptions )
        .fromFile( file )
        .on( 'json', rawPerson => {
            parsedItems.push( Utils.normalizePerson( rawPerson ) );
        } )
        .on( 'done', () => {
            Utils.writeFile( file, parsedItems );
        } )

} );