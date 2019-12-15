const allBreedsUrl = "https://dog.ceo/api/breeds/list/all";
const photoBaseUrl = "https://dog.ceo/api/breed/";

const vm = new Vue({
  el: '#app',
  data: function () {
    return {
      allBreeds: [],
      selectedBreeds: [],
      maxSelection: 2,
      picDivs: [],
      picsUrls: {},
      maxPic: 10
    }
  },

  created: function () {
    this.getAllBreeds();
  },
  methods: {
    removeElement(breedIndex, urlIndex) {
      console.log(breedIndex)
      console.log(urlIndex)
      // console.log(this.picsUrls)
      // console.log(this.picsUrls(0))
      this.picsUrls[breedIndex].urlArr.splice(urlIndex, 1);
      console.log(this.picsUrls[breedIndex].urlArr.length)
      if (this.picsUrls[breedIndex].urlArr.length ===0) {
        // this.picsUrls.slice(breedIndex, 1);
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
    getRandomImgsForEachBreed(breedName, number) {
      let name = breedName;
      axios.get(photoBaseUrl + breedName + '/images/random/' + number )
        .then((res) => {
          let data = res.data.message
          let obj = {
            breedName,
            urlArr: res.data.message
          }
          // console.log(breedName)
          // console.log(data)
          // console.log(this.picsUrls)
          //working
          this.picsUrls.push(obj);
          
          // not working
          // Vue.set(this.picsUrls, breedName, { urlArr: data });
          console.log(this.picsUrls)

          // this.$set(this.testNew, breedName, { urlArr: data });
          // this.$set(this.picsUrls, breedName, { urlArr: res.data.message });
          // console.log(this.picsUrls);
      });
    },
    getRamdomImages: function () {
      let numberPerBreed = this.maxPic / this.selectedBreeds.length;
      this.picDivs = [];
      this.picsUrls = [];
      this.selectedBreeds.forEach((breed) => {
        this.getRandomImgsForEachBreed(breed, numberPerBreed)
      })
    }

  }
});
