import { nested } from 'lib/NamedRoutes'

export default  {
	login: "/login",
	register: "/register",
	logout: "/logout",
	dashboard: {
		index: ["/", "/dashboard"]
	},
	events: nested("/events", {
		index: "/",
		new: "/new",
		show: "/:id"
	}),
	groups: nested("/groups", {
		index: "/"
	}),
	reports: nested("/reports", {
		index: "/"
	})
}