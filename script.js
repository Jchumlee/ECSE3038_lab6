axios.defaults.baseURL = "http://0.0.0.0:3000";
axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

Vue.createApp({
	data() {
		return {
			username: "",
			role: "",
			color: "",
			last_updated: "",
			tanks: [],
			location: "",
			lat: null,
			long: null,
			percentage_full: null,
		};
	},
	mounted() {
		axios.get("/profile").then((resp) => {
			const result = resp.data;

			if (result.success) {
				const { username, color, role, last_updated } = result.data;

				this.username = username;
				this.role = role;
				this.color = color;
				this.last_updated = last_updated;
			}
		});

		this.getData();
	},
	methods: {
		addTank() {
			axios
				.post("/data", {
					location: this.location,
					lat: this.lat,
					long: this.long,
					percentage_full: this.percentage_full,
				})
				.then((resp) => {
					this.getData();

					this.location = "";
					this.lat = null;
					this.long = null;
					this.percentage_full = null;
				});
		},
		getData() {
			axios.get("/data").then((resp) => {
				const result = resp.data;
				this.tanks = result;
			});
		},
		isNum(evt) {
			const key = evt.key;
			const code = evt.keyCode;
			const allowed = [37, 39, 8, 9, 46, 189, 190];

			if (code === 32) key = "space";
			if (isNaN(key) && allowed.indexOf(code) === -1)
				evt.preventDefault();
		},
	},
}).mount("#app");
