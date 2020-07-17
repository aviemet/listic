import { nested } from 'lib/NamedRoutes'

export default  {
	login: "/login",
	register: "/register",
	logout: "/logout",

	dashboard: "/dashboard",

	events: nested("/events", {
		new: "/new",
		show: nested("/:id", {
			settings: "/settings",
			test: "/:test",
		})
	}),

	groups: nested("/groups", {
	}),

	reports: nested("/reports", {
	}),

	test: nested("/test", {
		nope: "/nope",

		again: nested("/again", {
			something: "/:yup"
		})

	})

}