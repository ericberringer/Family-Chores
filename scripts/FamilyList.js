import { getChores, useChores } from "./ChoreProvider.js"
import { getFamilyMembers, useFamilyMembers } from "./FamilyProvider.js"
import { getFamilyChores, useFamilyChores } from "./FamilyChoreProvider.js"
import { FamilyMember } from "./FamilyMember.js"
// getChores is the chores fetch call, useChores is a copy of the chores array.
// getFamilyMembers is the family members from the fetch call, useFamilyMembers is a copy of the family array.
// getFamilyChores is the family Chores (chores that multiple people can do), useFamilyChores is a copy of the array of Family Chores.
// FamilyMember is the HTML representation for each person, the chore that is in the html rep
// is mapping through chores to select only the 'task'.
const contentTarget = document.querySelector(".family")

/*
    Component state variables with initial values
*/
let chores = []
let people = []
let peopleChores = []


/*
    Main component logic function
*/
export const FamilyList = () => {
    getChores()
        .then(getFamilyMembers)
        .then(getFamilyChores)
        .then(() => {
            /*
                Update component state, which comes from application
                state, which came from API state.

                API -> Application -> Component
            */
            chores = useChores()
            people = useFamilyMembers()
            peopleChores = useFamilyChores()

            console.table(chores)
            console.table(people)
            console.table(peopleChores)

            render()
        })
}

/*
    Component render function
*/
const render = () => {
    contentTarget.innerHTML = people.map(person => {
        const relationshipObjects = getChoreRelationships(person)
// people.map is iterating through the array of people (name: and Id:), relationshipObjects is 
// connecting the id of the family member to the id of the family chore.
        /*
            End result for family member 1...

            [
                { "id": 1, "familyMemberId": 1, "choreId": 4 },
                { "id": 2, "familyMemberId": 1, "choreId": 5 }
            ]
        */

        const choreObjects = convertChoreIdsToChores(relationshipObjects)
        /*
            End result for family member 1...

            [
                { "id": 4, "task": "Clean the bedrooms" },
                { "id": 5, "task": "Family game night" }
            ]
        */

        // Get HTML representation of product
        const html = FamilyMember(person, choreObjects)

        return html
    }).join("")
}



// Get corresponding relationship objects for a person
const getChoreRelationships = (person) => {
    const relatedChores = peopleChores.filter(pc => pc.familyMemberId === person.id)
    console.log(relatedChores)
// familyMemberId is in the family chores table (peopleChores). It is how the family chore is connected to the family member ID.
// This is filtering through peopleChores (list of chores multiple people can do), and grabbing the 
// family chore Id that matches the family member id and storing both of them.
    return relatedChores
}

// Convert array of foreign keys to array of objects
const convertChoreIdsToChores = (relationships) => {
    const choreObjects = relationships.map(rc => {
        return chores.find(chore => chore.id === rc.choreId)
    })
    
    return choreObjects
}
