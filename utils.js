const fs = require( 'fs' );
const moment = require( 'moment' );


const Utils = {
    normalizePerson: rawPerson => {
        return {
            name: `${rawPerson.last_name} ${rawPerson.first_name}`,
            phone: rawPerson.phone.replace( /[^0-9]/g, '' ),
            person: {
                firstName: rawPerson.first_name,
                lastName: rawPerson.last_name
            },
            amount: +rawPerson.amount,
            date: moment( rawPerson.date, "DD\/M\/YYYY" ).format( "YYYY-MM-DD" ),
            costCenterNum: rawPerson.cc.replace( /\D/g, '' )
        }
    },

    writeFile: ( filePath, array ) => {
        const filename = filePath.substring( filePath.lastIndexOf( '/' ) + 1, filePath.length - 4 );
        fs.writeFile( `${__dirname}/output/${filename}.json`, JSON.stringify( array ), error => {
            if ( error ) {
                throw error;
                console.log( "Error:", error );
            } else {
                console.log( `${__dirname}/output/${filename}.json written Successifully!` );
            }
        } );
    }
}

module.exports = Utils;