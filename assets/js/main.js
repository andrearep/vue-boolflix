function replaceSpaceWPlus(string) {
    return string.replace(' ', '+')
}
function addFlag(object) {
    for (let i = 0; i < object.length; i++) {
        if (object[i].original_language != 'en') {
            object[i].flag = `https://flagcdn.com/${object[i].original_language}.svg`
        } else if (object[i].original_language == 'en') {
            object[i].flag = `https://flagcdn.com/gb.svg`
        } else {
            object[i].flag = `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/220px-International_Flag_of_Planet_Earth.svg.png`
        }
    }
    return object;
}

const app = new Vue({

    el: "#root",
    data: {
        filmSearch: null,
        filmSearchPlus: null,
        films: [],
        series: []

    },
    methods: {

        searchFilm: function serchFilm() {
            this.filmSearchPlus = replaceSpaceWPlus(this.filmSearch);
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=${this.filmSearchPlus}`)
                .then(resp => {
                    this.films = resp.data.results
                    this.films = addFlag(this.films)
                })
        },

        searchSerie: function serchSerie() {
            this.filmSearchPlus = replaceSpaceWPlus(this.filmSearch);
            axios
                .get(`https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=${this.filmSearchPlus}`)
                .then(resp => {
                    this.series = resp.data.results
                    this.series = addFlag(this.series)
                })
        },
    },

})