import Vue from 'vue/dist/vue';

let calculator = new Vue({
	el: '.calculator',
	data: {
		currentValue: '0',
		operator: null,
		previousValue: null,
		isNewValue: false,
		afterEquals: false
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
			if ( this.previousValue && !this.afterEquals ) {
				this.previousValue = this.operator(
					this.previousValue,
					this.currentValue
				);
				this.isNewValue = true;
			} else {
				this.setValues();
				this.afterEquals = false;
			}
		},
		divide() {
			this.passedCalculation();
			this.operator = (a, b) => `${a / b}`;
		},
		times() {
			this.passedCalculation();
			this.operator = (a, b) => `${a * b}`;
		},
		minus() {
			this.passedCalculation();
			this.operator = (a, b) => `${a - b}`;
		},
		plus() {
			this.passedCalculation();
			this.operator = (a, b) => `${parseFloat(a) + parseFloat(b)}`;
		},
		equal() {
			this.currentValue = this.operator(
				this.previousValue,
				this.currentValue
			);
			this.setValues();
			this.afterEquals = true;
		}
	}
});
