import Vue from 'vue'
import { Doughnut, Bar, Pie, Line,Radar,Scatter,PolarArea } from 'vue-chartjs'
// Vue.component('line-chart', {
// 	extends: Line,
// 	props: ['data', 'options'],
// 	mounted () {
// 		// var gradientStroke = this.$refs.canvas.getContext('2d').createLinearGradient(0, 230, 0, 50);

//         // gradientStroke.addColorStop(1, 'rgba(253,93,147,0.8)');
//         // gradientStroke.addColorStop(0, 'rgba(253,93,147,0)'); 
// 		this.renderChart(this.data, this.options)
// 	}
// })
Vue.component('line-chart', {
	extends: Line,
	props: ['data', 'options'],
	watch: {
		data: function() {
			this.renderChart(this.newData, this.newOptions)
		}
	  },
	data () {
	  return {
		gradient: null,
		newData:null,
		newOptions:null
	  }
	},
	mounted () {
	  this.newData = this.data
	  this.newOptions = this.options


	  if(!this.newOptions){
		this.newOptions = {responsive: true, maintainAspectRatio: false}
	  }
	//   jsonArray_Issues.push( { "ID" : 1, "Name" : 1, "Notes" : 1 } );
	//   console.log(jsonArray_Issues)

// setInterval(() => {
// 	for (let index = 0; index < this.newData.datasets.length; index++) {
// 		let element = this.newData.datasets[index];

// 		this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
// 		this.gradient.addColorStop(0, `${clr1}`)
// 		this.gradient.addColorStop(0.5, `${clr2}`);
// 		this.gradient.addColorStop(1, `${clr3}`);

// 		element.backgroundColor = this.gradient
// 		console.log(element)
// 	}
// 	this.renderChart(this.newData, this.newOptions)
// }, 1000);

	//   console.log(lol)
	this.renderChart(this.newData, this.newOptions)
	//   this.renderChart({
	// 	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	// 	datasets: [
	// 	  {
	// 		label: 'Data One',
	// 		borderColor: '#FC2525',
	// 		pointBackgroundColor: 'white',
	// 		borderWidth: 1,
	// 		pointBorderColor: 'white',
	// 		backgroundColor: this.gradient,
	// 		data: [40, 39, 10, 40, 39, 80, 40]
	// 	  },{
	// 		label: 'Data Two',
	// 		borderColor: '#05CBE1',
	// 		pointBackgroundColor: 'white',
	// 		pointBorderColor: 'white',
	// 		borderWidth: 1,
	// 		backgroundColor: this.gradient2,
	// 		data: [60, 55, 32, 10, 2, 12, 53]
	// 	  }
	// 	]
	//   }, {responsive: true, maintainAspectRatio: false})
  
	}
})








Vue.component('pie-chart', {
	extends: Pie,
	props: ['data', 'options'],
	mounted () {
		this.renderChart(this.data, this.options)
	}
})

Vue.component('bar-chart', {
	extends: Bar,
	props: ['data', 'options'],
	data () {
		return {
		  newOptions:null
		}
	  },
	mounted() {
		this.newOptions = this.options
		if(!this.newOptions){
			this.newOptions = {responsive: true, maintainAspectRatio: false}
		  }
		this.renderChart(this.data, this.newOptions)
	},  
})

Vue.component('doughnut-chart', {
	extends: Doughnut,
	props: ['data', 'options'],
	mounted() {
		this.renderChart(this.data, this.options)
	},  
})
Vue.component('radar-chart', {
	extends: Radar,
	props: ['data', 'options'],
	mounted() {
		this.renderChart(this.data, this.options)
	},  
})
Vue.component('polarArea-chart', {
	extends: PolarArea,
	props: ['data', 'options'],
	mounted() {
		this.renderChart(this.data, this.options)
	},  
})
Vue.component('scatter-chart', {
	extends: Scatter,
	props: ['data', 'options'],
	mounted() {
		this.renderChart(this.data, this.options)
	},  
})