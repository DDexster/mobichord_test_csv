const fs = require( 'fs' ),
    _ = require( 'lodash' ),
    Utils = require( './utils.js' ),
    JSZip = require( 'jszip' ),
    Finder = require( 'fs-finder' );


//Search "zip" files in "/input" directory and make an array of found files
const inputFiles = Finder
    .from( __dirname + "/input" )
    .findFiles( '*.zip' );

//Exit program if there is no ".zip" files
if ( !inputFiles || inputFiles.length === 0 ) {
    console.log( "Error: No '.zip' files found in '/input' drectory" );
    return;
}

//Iter all found files and check if they have ".csv" files
inputFiles.forEach( file => {
    fs.readFile( file, function ( err, data ) {
        if ( err ) {
            throw err;
            console.log( "Error:", err );
        }

        JSZip.loadAsync( data ).then( zip => {
            // Iterate file entries in zip archive
            _.forIn( zip.files, ( file, fileName ) => {
                //Check if it's a ".csv"
                if ( fileName.substring( fileName.length - 4 ) === ".csv" ) {
                    //if it does unzip it and make a normalized "JSON" file
                    zip.files[ fileName ].async( 'string' ).then( content => {
                        Utils.parseCsvAndMakeJson( content, fileName );
                    } );
                }
            } );
        } );
    } );
} );
