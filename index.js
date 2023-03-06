//hello this is a git test
const { parse } = require('csv-parse');
const fs = require('fs')
//create a new array to hold filtered planets
const result =[];
//Filter the data to find livable planets
function livingPlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6
}

//This reads our file  and filter data file
fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment: "#",
    columns: true,
}))
.on('data', (data)=>{
    if (livingPlanet(data))
    result.push(data)
})
.on('err', (err)=>{
    console.log('!! THERE IS AN ERROR !!', err.message)
})
.on('end', () =>{
    console.log(result);
    console.log(`There were ${result.length} planets found to be livable!`)
    console.log(' Data filter done');
});