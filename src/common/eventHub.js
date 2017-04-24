import Vue from 'vue';
const eventHub = new Vue();
eventHub.$on('welcome', arg => {
	console.log(`welcome: ${arg}`);
});
export default eventHub;