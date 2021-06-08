function replaceSpaceWPlus(string) {
    return string.replace(' ', '+')
}

const app = new Vue({

    el: "#root",
    data: {
        filmSearch: null,
        filmSearchPlus: null,
        films: null

    },
    methods: {
        searchFilm: function serchFilm() {
            this.filmSearchPlus = replaceSpaceWPlus(this.filmSearch);
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=${this.filmSearchPlus}`)
                .then(resp => {
                    this.films = resp.data.results

                    for (let i = 0; i < this.films.length; i++) {
                        this.films[i].flag = `https://flagcdn.com/${this.films[i].original_language}.svg`
                    }

                })
        }
    },

    mounted() {
    }
})