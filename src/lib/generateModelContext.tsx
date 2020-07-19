import React from 'react'

const generateModelContext = (model, store) => {
	const contextVarName = `${model}StoreContext`
	const hookVarName = `use${model}`
	const providerVarName = `${model}ContextProvider`

	const returnValue = {}
	returnValue[contextVarName] = React.createContext({})
	returnValue[hookVarName] = React.useContext(returnValue[contextVarName])
	returnValue[providerVarName] = ({ children }) => {
		const Provider = returnValue[hookVarName]

		return (
			<Provider.Provider value={ new store()}>
				{ children }
			</Provider.Provider>
		)
	}

}

export default generateModelContext