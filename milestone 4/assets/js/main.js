function replaceSpaceWPlus(string) {
    return string.replace(' ', '+')
}
/**
 * ritorna l'oggetto dat con una chiave flag contenente il link all'immagine della bandiera
 * @param {object} object  deve contenere un elemento original_language per poter essere valida
 * @returns {object} object l'oggettto iniziale con l'elemento flag
 */
function addFlag(object) {
    for (let i = 0; i < object.length; i++) {

        if (object[i].original_language == 'ja') {
            object[i].flag = `https://flagcdn.com/jp.svg`
        } else if (object[i].original_language == 'en') {
            object[i].flag = `https://flagcdn.com/gb.svg`
        } else {
            object[i].flag = `https://flagcdn.com/${object[i].original_language}.svg`
        }

    }
    return object;
}
function addPathImg(object) {
    for (let i = 0; i < object.length; i++) {
        if (object[i].poster_path != undefined) {
            object[i].pathImg = `https://image.tmdb.org/t/p/w342/${object[i].poster_path}`
        } else {
            object[i].pathImg = "./assets/img/no_image_Netflix.png"
        }
    }

    return object
}

function transformKey(object, oldName, newName) {
    for (let i = 0; i < object.length; i++) {
        object[i][newName] = object[i][oldName];
        delete object[i][oldName];
        return object
    }
}

const app = new Vue({

    el: "#root",
    data: {
        noFilm: false,
        searchSwitch: 0,
        filmSearch: null,
        filmSearchPlus: null,
        stars: [],
        filmSerie: [
            /* film */
            {
                name: "film",
                movieList: [],
                url: "https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query="
            },
            /* serie tv */
            {
                name: "Serie TV",
                movieList: [],
                url: "https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query="
            }
        ]
    },

    methods: {

        search: function search() {
            this.filmSearchPlus = replaceSpaceWPlus(this.filmSearch)
            this.filmSerie.forEach((element) => {
                axios
                    .get(`${element.url}${this.filmSearchPlus}`)
                    .then(resp => {

                        element.movieList = (resp.data.results)
                        element.movieList = addFlag(element.movieList)

                        /* cambiamo le chiavi che non corrispondono e che ci servono */
                        if (element.name == "Serie TV" && element.movieList > 0) {
                            element.movieList = transformKey(element.movieList, "name", "title")
                            element.movieList = transformKey(element.movieList, "original_name", "original_title")
                        }
                        /* aggiunta elemento pathImg */
                        element.movieList = addPathImg(element.movieList)
                        console.log(element.movieList);
                    })
                    .catch(e => {
                        console.error(e);
                        console.log(e)
                    })
            })

            if (this.filmSerie[0].movieList.length == 0 && this.filmSerie[1].movieList.length == 0) {
                this.noFilm = true;
            } else {
                this.noFilm = false
            }
        },

        switchOn: function switchOn() {
            return this.searchSwitch = 1;
        }
    },

    mounted() {
        document.addEventListener('keyup', (e) => {
            if (e.key !== '') {
                this.search();
            }
        })


    }
})