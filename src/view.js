import { store, getContext } from "@wordpress/interactivity";

const {state} = store("crypto-store", {
    state: {
        selectedCoin: "bitcoin",
        isAllReportVisible: false,
        data: null,
        allReportData: null,
        isLoading: false,
        error: null,
        lastUpdated: null,
        attributes,
    },
	actions: {
		setSelectedCoin: (e) => {
			const context = getContext();
			state.selectedCoin = e.target.value

            console.log(context.selectedCoin);
		},
	
	},
});
