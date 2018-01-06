// db.getCollection('users').insert({
//     linkedInId: "287623876", 
//     displayName: "Elon Musk", 
//     image: "http://www.carlogos.org/logo/Tesla-logo-2003-2500x2500.png", 
//     title: "Ceo - SpaceX", 
//     bio: "Tesla Cars are so badass", 
//     email: "elon@email.com",
//     type: 'employee',
//     searchable: true, 
//     website: "tesla.com", 
//     matches: [],
//     pendingMatches: [], 
//     connections: [], 
//     denied: [],
//     skills: [],
//     desiredSkills: []
// });


// {linkedInId: "982365908", displayName: "Mark Zuckerberg", image: "https://seeklogo.com/images/F/facebook-logo-39A76724E4-seeklogo.com.png", title: "Ceo - Facebook", bio: "Facebook knows everything about you", email: "facebook@email.com", website: "facebook.com", matches: [], connections: [], denied: []},
// {
//     linkedInId: "287623876", 
//     displayName: "Elon Musk", 
//     image: "http://www.carlogos.org/logo/Tesla-logo-2003-2500x2500.png", 
//     title: "Ceo - SpaceX", 
//     bio: "Tesla Cars are so badass", 
//     email: "elon@email.com",
//     type: 'employee',
//     searchable: true, 
//     website: "tesla.com", 
//     matches: [],
//     pendingMatches: [], 
//     connections: [], 
//     denied: [],
//     skills: [],
//     desiredSkills: []
// },
// {
//     linkedInId: "928759823", 
//     displayName: "Jeff Bezos", 
//     image: "http://www.vmastoryboard.com/wp-content/uploads/2014/08/Amazon-Logo_Feature.jpg", 
//     title: "Ceo - Amazon", 
//     bio: "Undercutting our competition, it's what we do...", 
//     email: "bezos@email.com",
//     type: 'employee',
//     searchable: true, 
//     website: "amazon.com", 
//     matches: [],
//     pendingMatches: [],  
//     connections: [], 
//     denied: [],
//     skills: [],
//     desiredSkills: []
// },
// {
//     linkedInId: "453425234", 
//     displayName: "Greg Blatt", 
//     image: "https://static.dezeen.com/uploads/2017/08/tinder-redesign-graphics_dezeen_redo-2-852x421.jpg", 
//     title: "Ceo - Tinder", 
//     bio: "Tesla Cars are so badass", 
//     email: "greg@email.com", 
//     type: 'employee',
//     searchable: true, 
//     website: "tinder.com", 
//     matches: [],
//     pendingMatches: [], 
//     connections: [], 
//     denied: [],
//     skills: [],
//     desiredSkills: []
// }




// db.getCollection('users').update({linkedInId: "75NNABzWuJ"}, {$push: {connections: {linkedInId: "982365908", displayName: "Mark Zuckerberg", image: "https://seeklogo.com/images/F/facebook-logo-39A76724E4-seeklogo.com.png", title: "Ceo - Facebook", bio: "Facebook knows everything about you", email: "facebook@email.com", website: "facebook.com", matches: [], connections: [], denied: []}}})









