const config = require('../config/config.json');
const db = require('../helpers/db.js');
const Film = db.Film;


module.exports = {
    getFilmInfo, //for streaming site using
    getAllFilm,
    createFilm, // for dashboard site
    updateFilm,
    deleteFilm
};

async function getFilmInfo(id){
    const film = await Film.findOne({id: id});
    if (film) {
        return film;
    }
}
async function getAllFilm(){
    const listFilm = await Film.find({});
    if (listFilm){
        return listFilm;
    }
}
async function createFilm(filmParams){
    //validate
    if(await Film.findOne({id: filmParams.id})){
        throw 'Film "' + filmParams.name + ' " has already added';
    }
    let film = new Film(filmParams);
    //save film to database
    await film.save();
}
async function updateFilm(id, filmParams){
    var film = await Film.findById(id);
    
    //validate
    if (!film) throw 'Film not found';
    //override filmParams to film and update to database
    Object.assign(film, filmParams);
    await film.save();
}
async function deleteFilm(id){
    await Film.findByIdAndDelete(id);
}