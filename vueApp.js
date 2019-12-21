const allBreedsUrl = "https://dog.ceo/api/breeds/list/all";
const photoBaseUrl = "https://dog.ceo/api/breed/";

const vm = new Vue({
  el: '#app',
  data: function () {
    return {
      allBreeds: [],
      selectedBreeds: [],
      maxSelection: 2,
      picsUrls: {},
      maxPic: 10
    }
  },

  created: function () {
    this.getAllBreeds();
  },

  methods: {
    removeElement(breedIndex, urlIndex) {
      this.picsUrls[breedIndex].urlArr.splice(urlIndex, 1);
      console.log(this.picsUrls[breedIndex].urlArr.length)
      if (this.picsUrls[breedIndex].urlArr.length === 0) {
        this.$delete(
          this.selectedBreeds,
          this.selectedBreeds.indexOf(this.picsUrls[breedIndex].breedName)
        );
        this.$delete(this.picsUrls, breedIndex);
        console.log('should have deleted something?')
      }
    },
    getAllBreeds: function () {
      axios.get(allBreedsUrl).then(response => {
        this.allBreeds = (response.data.message)
      })
    },
    addImgRequestPerBreed: function (breedName, number) {
      return axios.get(photoBaseUrl + breedName + '/images/random/' + number)
    },
    getImgsForAll: function () {
      let numberPerBreed = this.maxPic / this.selectedBreeds.length;
      this.picsUrls = [];
      let axiosQueries = [];
      this.selectedBreeds.forEach((breed) => {
        axiosQueries.push(this.addImgRequestPerBreed(breed, numberPerBreed))
      });
      axios.all(axiosQueries)
        .then(resArr => {
          resArr.forEach((res, index) => {
            let breedName = this.selectedBreeds[index];
            let obj = {
              breedName,
              urlArr: res.data.message
            }
            this.picsUrls.push(obj);
          })
        })
    }}
  });
