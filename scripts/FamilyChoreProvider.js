let familyChores = []

export const useFamilyChores = () => familyChores.slice()

export const getFamilyChores = () => fetch("http://localhost:8088/familychores")
    .then(res => res.json())
    .then(data => familyChores = data)

// This provides a unique ID for the familyChore,
// a family member ID that corresponds with a family
// members unique ID, and a chore ID that corresponds to 
// a chores unique ID.