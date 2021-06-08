const app = new Vue({
    el: "#root",
    data: {

    },
    methods: {

    },

    mounted() {
        axios
            .get("https://api.themoviedb.org/3/movie/550?api_key=8cdf7854b5e8d81f642d19f2e6ddd5d4")
            .then(resp => {
                console.log(resp.data);
            })
    }
})