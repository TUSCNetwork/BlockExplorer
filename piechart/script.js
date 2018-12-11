Vue.component('tusc-pie-chart', {
	template: '#tusc-pie-chart',
	props: {
		dataSet: Array
	},
	methods: {
		draw: function() {
			console.log('draw on');
			console.log(this.dataSet.map((s) => `\t${s.count} - ${s.label}`).join("\n"));

			let path = this.g.selectAll('path')
				.data(this.pie(this.dataSet)) // binds the data set in d3
				.attr('d', this.arc) // redraw the arcs
				.attr('fill', d => this.color(d.data.index)); // compute the new angles
				
			path
				.enter() // handles adding new slices in d3
				.append('path');
			
			path
				.exit() // handles removing slices in d3
				.remove();
		}
	},
	watch: {
		dataSet: function() {
			this.draw();
		}
	},
	mounted: function() {
		let d3 = window.d3;
		
		let width = 360;
		let height = 360;
		this.radius = Math.min(width, height) / 2;

		this.pie = d3.pie()
			.value(d => d.count)
			.sort(null);

		this.arc = d3.arc()
			.innerRadius(0)
			.outerRadius(this.radius);

		this.color = d3.scaleOrdinal(d3.schemeSet1);

		// TODO update sizes repsonsively
		d3.select(this.$refs.svg)
			.attr('width', width)
			.attr('height', height);

		// TODO update sizes repsonsively
		this.g = d3.select(this.$refs.g)
			.attr('transform', 'translate(' + (width / 2) +
				',' + (height / 2) + ')');

		// TODO not drawing on mount
		this.$nextTick(() => {
			setTimeout(() => this.draw(), 2000);
		});
	}
});

let app = new Vue({
	el: '#app',
	data: function() {
		return { convenienceInput: '1 1' };
	},
	computed: {
		parsedInput: function() {
			let lines = this.convenienceInput.split('\n');
			let labels = [];
			if (lines.length > 1) {
				labels = lines[1].split(/\s/g)
			}
			return Array.from(lines[0].split(/\s/g))
				.map((s, i) => ({
					label: labels.length
						? (labels[i] || '')
						: `group of ${s} things`,
					index: i,
					count: parseFloat(s)
				})
			)
			.filter((s) => s.count);
		}
	}
});
