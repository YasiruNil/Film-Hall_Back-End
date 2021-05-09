const { 
    filmById,
    createFilm,
    getAllFilms,
    getFilmPhoto,
    updatefilmById,
    removefilmById,
    
  } = require("../controllers/film")
const { isAuth, isAdmin } = require("../controllers/auth")
const { requireSignin, userById } = require("../controllers/user")

module.exports = (app) => {
    app.param("userId", userById )

    app.param("filmId", filmById )

    app.get("/films",getAllFilms )

    app.get("/film/photo/:filmId",getFilmPhoto )

    app.post("/admin/create-film/:userId", requireSignin, isAuth, isAdmin, createFilm)

    app.post("/film/:filmId/:userId",requireSignin, isAuth, isAdmin, updatefilmById )

    app.delete("/film/:filmId/:userId",requireSignin, isAuth, isAdmin, removefilmById )


}