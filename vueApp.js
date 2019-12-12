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
          this.picDivs = this.picDivs.fill(this.selectedBreeds[1], 5)
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
  },
  methods: {
    removeElement: function (index) {
      // Vue.delete(this.picsUrls, index);
      this.picsUrls.splice(index, 1);
      this.picDivs.splice(index, 1);
      // console.log(this.picDivs);
      // console.log(this.selectedBreeds[0])
      // console.log(this.selectedBreeds[1])
      if ((this.picDivs.length <= this.maxPic / 2) ) {
        console.log(this.picDivs.indexOf(this.selectedBreeds[0]))
        console.log(this.picDivs.indexOf(this.selectedBreeds[1]))

        if(this.picDivs.indexOf(this.selectedBreeds[0]) === -1) {
          // this.selectedBreeds = this.selectedBreeds.splice(0, 1);
          this.selectedBreeds.splice(0, 1);
        } else if (this.selectedBreeds.length === 2 && (this.picDivs.indexOf(this.selectedBreeds[1]) === -1)) {
          this.selectedBreeds.splice(1, 1);
          // this.selectedBreeds = this.selectedBreeds.splice(1, 1);
        }
      }
    }
  }
});
