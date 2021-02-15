let people = []

export const useFamilyMembers = () => people.slice()

export const getFamilyMembers = () => fetch("http://localhost:8088/familymembers")
    .then(res => res.json())
    .then(data => people = data)

// This is the fetch call that grabs only the
// name of the family member and their unique ID.
// Id : ""
// name: ""
