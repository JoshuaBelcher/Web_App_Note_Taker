// object for the note filters with initial property values
const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

// expose filters object from module
const getFilters = () => filters

// set new filters properties based on user input
const setFilters  = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
}

export { getFilters, setFilters }