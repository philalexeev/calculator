import Vue from 'vue/dist/vue.min';

let calculator = new Vue({
	el: '.calculator',
	data: {
		currentValue: '0',
		operator: null,
		previousValue: null,
		isNewValue: false
	},
	methods: {
		append(num) {
			if ( this.currentValue === '0' || this.isNewValue ) {
				this.currentValue = '';
				this.currentValue = `${num}`;
				this.isNewValue = false;
			} else {
				this.currentValue = `${this.currentValue}${num}`
			}
		},
		appendDot() {
			if ( this.currentValue.indexOf('.') === -1 ) {
				this.currentValue = `${this.currentValue}${"."}`
			}
		},
		clear() {
			this.currentValue = '0'
		},
		negative() {
			if ( this.currentValue > 0 ) {
				this.currentValue = `-${this.currentValue}`
			} else if ( this.currentValue < 0 ) {
				this.currentValue = `${Math.abs(this.currentValue)}`
			}
		},
		percent() {
			this.currentValue = `${this.currentValue / 100}`
		},
		divide() {
			this.operator = (a, b) => a / b;
			this.previousValue = this.currentValue;
			this.isNewValue = true;
		},
		equal() {
			this.currentValue = this.operator(
				this.previousValue,
				this.currentValue
			)
		}
	}
});
