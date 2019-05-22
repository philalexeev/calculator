import Vue from 'vue/dist/vue';

let calculator = new Vue({
	el: '.calculator',
	data: {
		currentValue: '0',
		operator: null,
		previousValue: null,
		isNewValue: false,
		passedValue: ''
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
			this.currentValue = '0';
			this.operator = null;
			this.previousValue = null;
			this.isNewValue = false;
			this.passedValue = '';
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
		setValues() {
			this.previousValue = this.currentValue;
			this.isNewValue = true;
		},
		passedCalculation() {
			if ( this.operator ) {
				this.passedValue = this.operator(this.previousValue, this.currentValue);
			}
		},
		divide() {
			this.passedCalculation();
			this.operator = (a, b) => a / b;
			this.setValues();
		},
		times() {
			this.passedCalculation();
			this.operator = (a, b) => a * b;
			this.setValues();
		},
		minus() {
			this.passedCalculation();
			this.operator = (a, b) => a - b;
			this.setValues();
		},
		plus() {
			this.passedCalculation();
			this.operator = (a, b) => parseFloat(a) + parseFloat(b);
			this.setValues();
		},
		equal() {
			if ( this.passedValue ) {
				this.currentValue = this.operator(
					this.passedValue,
					this.currentValue
				)
			} else {
				this.currentValue = this.operator(
					this.previousValue,
					this.currentValue
				)
			}
		}
	}
});
