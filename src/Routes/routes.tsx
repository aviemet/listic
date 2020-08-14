import { nested } from 'rr-named-routes'

export default {
	login: "/login",
	logout: "/logout",
	dashboard: "/dashboard",
	register: "/register",

	events: nested("/events", {
		new: "/new",
		show: nested("/:id", {
			edit: "/edit"
		})
	}),

	groups: nested("/groups", {}),

	reports: nested("/reports", {}),

	settings: nested("/settings", {
		__index__: false,
		user: "/user"
	}),

	test: "/test"
}
