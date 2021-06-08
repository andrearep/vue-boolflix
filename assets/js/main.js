function replaceSpaceWPlus(string) {
    return string.replace(' ', '+')
}

const app = new Vue({

    el: "#root",
    data: {
        filmName: null,
        filmNamePlus: null

    },
    methods: {
        searchFilm: function serchFilm() {
            this.filmNamePlus = replaceSpaceWPlus(this.filmName);
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=${this.filmNamePlus}`)
                .then(resp => {
                    console.log(resp.data.results);
                })
        }
    },

    mounted() {
    }
})