import { nested } from 'lib/NamedRoutes'

export default {
	login: "/login",
	logout: "/logout",
	dashboard: "/dashboard",
	register: "/register",

	events: nested("/events", {
		new: "/new",
		show: nested("/:id", {
			settings: "/settings"
		})
	}),

	groups: nested("/groups", {}),

	reports: nested("/reports", {}),

	settings: nested("/settings", {
		__index__: false,
		user: "/user"
	})
}


const routes = {
	login: {
		__index__: "/login"
	},
	logout: {
		__index__: "/logout"
	},
	dashboard: {
		__index__: "/dashboard"
	},
	register: {
		__index__:"/register"
	},
	events: {
		__index__: "/events",
		new: {
			__index__: "/events/new"
		},
		show: {
			__index__: "/events/:id",
			settings: {
				__index__: "/events/:id/settings"
			}
		}
	},
	groups: {
		__index__: "/groups"
	},
	reports: {
		__index__: "/reports"
	},
	settings: {
		__index__: false,
		user: {
			__index__: "/settings/user"
		}
	}
}