const allBreedsUrl = "https://dog.ceo/api/breeds/list/all";
const photoBaseUrl = "https://dog.ceo/api/breed/";

const vm = new Vue({
  el: '#app',
  data: {
    allBreeds: [],
    selectedBreeds: [],
    maxSelection: 2,
    picDivs: [],
    picsUrls: [],
    maxPic: 10
  },
  watch: {
    selectedBreeds: function () {
      if (this.selectedBreeds.length === 0) {
        this.picDivs = [];
        this.picsUrls = [];
      } else if (this.selectedBreeds.length === 1) {
        axios.get(photoBaseUrl + this.selectedBreeds[0] + '/images').then(res => {
          this.picsUrls = res.data.message.slice(0, this.maxPic)
          // console.log(res.data.message);
          this.picDivs = new Array(10).fill(this.selectedBreeds[0])
          console.log(this.picDivs)
          console.log(this.picsUrls)
        })
      } else if (this.selectedBreeds.length === 2) {
        this.picsUrls = this.picsUrls.slice(0, this.maxPic / 2);
        console.log(this.selectedBreeds[1]);
        console.log(this.picsUrls);
        axios.get(photoBaseUrl + this.selectedBreeds[1] + '/images').then(res => {
          this.picsUrls = this.picsUrls.concat(res.data.message.slice(0, this.maxPic / 2))
          this.picDivs = new Array(10).fill(this.selectedBreeds[0]);
          this.picDivs = this.picDivs.fill(this.selectedBreeds[1], 6)
          console.log(this.picDivs)
          console.log(this.picsUrls)
        })
      }
    }
  },
  mounted: function () {
    axios.get(allBreedsUrl).then(response => {
      // console.log(typeof (response.data.message))
      this.allBreeds = (response.data.message)
    })
  }
});
