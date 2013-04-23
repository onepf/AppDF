JavaScript AppDF Parser
=====

This code can parse description.xml, make all needed validations and return JSON data. 

Usage Samples
=====
```javascript
//you must first extract text of description.xml from ZIP archive 
//var xml = ...;

appdfParser.parseDescriptionXML(xml, function(data) {
        //This code is called when description.xml is successefully parsed into JSON data

        //Here are few example of data usage:
        var isFree = data["price"]["free"];
        var price = data["price"]["base-price"];
    }, function(errors) {
        for (var i=0; i<errors.length; i++) {
            console.log(errors[i]);
        };
    }, function(current, total) {
        console.log("progress: " + current + " of " + total);
    }, false
);
```