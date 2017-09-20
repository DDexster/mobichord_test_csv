const fs = require( 'fs' ),
    csv = require( 'csvtojson' ),
    moment = require( 'moment' );

const csvOptions = {
    delimiter: "||"
}


const Utils = {
    normalizePerson: function ( rawPerson ) {
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

    writeFile: function ( fileName, array ) {
        const coupFileName = fileName.substring( 0, fileName.length - 4 );
        fs.writeFile( `${__dirname}/output/${coupFileName}.json`, JSON.stringify( array ), error => {
            if ( error ) {
                throw error;
                console.log( "Error:", error );
            } else {
                console.log( `${__dirname}/output/${coupFileName}.json written Successifully!` );
            }
        } );
    },

    parseCsvAndMakeJson: function ( stringBuffer, fileName ) {
        const parsedItems = [];
        csv( csvOptions )
            .fromString( stringBuffer )
            .on( 'json', rawPerson => {
                parsedItems.push( this.normalizePerson( rawPerson ) );
            } )
            .on( 'done', () => {
                this.writeFile( fileName, parsedItems );
            } )

    }
}

module.exports = Utils;