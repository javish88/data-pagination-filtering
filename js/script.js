/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const header = document.querySelector('header');
const searchBarHTML = `
   <label for="search-bar" class="student-search">
      <input type="text" id="search" placeholder="Search by name...">
      <button id="search-button" type="button"><img src="img/icn-search.svg" alt="Search Icon"></button>
   </label>
`;
header.insertAdjacentHTML('beforeend', searchBarHTML);

const searchBar = header.querySelector('#search');
const searchButton = header.querySelector('#search-button');

const studentList = document.querySelector('ul.student-list');
const linkList = document.querySelector('ul.link-list');

/*
  Created 'search' function 
  takes the value of the search bar to filter
  through the list of students and display the filtered list 
  on the window
*/
function search(searchInput, list) {
   const filteredList = [];

   // this loop is to go through the list of students
   for (let i = 0; i < list.length; i++) {
       const student = list[i];
       const studentName = `${student.name.first} ${student.name.last}`.toLowerCase();

      //  the conditional statement checks if the search bar is not empty and if the current student has the value of the search bar in their name
      //   if both conditions are true it appends the current student to the filtered list
       if (searchInput.value.length != 0 && studentName.includes(searchInput.value.toLowerCase())) {
           filteredList.push(student);
       }
   }

      /***
    * the first if statement checks if the filtered list is not empty. If conditions are met it will display the filtered list of students
    * the else if statement checks if the user typed something on the search bar and there are no results then displays appropiate message if conditions are met
    * the last else if statement checks if the search bar is empty and if the filtered list is empty then resets to the full list of students
    */
   if (filteredList.length != 0) {
      showPage(filteredList, 1);
      addPagination(filteredList);
  } else if (filteredList.length == 0 && searchInput.value.length != 0) {
      studentList.innerHTML = `<h2>These Are Not The Students You're looking for</h2>`;
      linkList.innerHTML = '';
  } else if (filteredList.length == 0 && searchInput.value.length == 0) {
      showPage(data, 1);
      addPagination(data);
  }
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   //shows 9 students on display
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   // this resets the list of students
   studentList.innerHTML = '';

   // the for loop iterates the list of student objects and creates a student list item and adds it to the studentList HTML
   for (let i = 0; i < list.length; i++) {
       if (i >= startIndex && i < endIndex) {
           const student = list[i];
           const studentLi = `
               <li class="student-item cf">
                   <div class"student-details>
                       <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
                       <h3>${student.name.first} ${student.name.last}</h3>
                       <span class="email">${student.email}</span>
                   </div>
                   <div class="joined-details">
                       <span class="date">Joined: ${student.registered.date}</span>
                   </div>
               </li>
           `;
           
           studentList.innerHTML += studentLi;
       }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfButtons = Math.ceil(list.length / 9);
   linkList.innerHTML = '';

   // The loop creates the buttons necessary for the pages and adds them to the button list
   for (let i = 0; i < numOfButtons; i++) {
      const button = `
         <li>
            <button type="button">${i + 1}</button>
         </li>
      `;
      linkList.innerHTML += button
   }

   // First page is displayed so the first button is set as active
   const firstButton = linkList.firstElementChild;
   firstButton.className = "active";

   // added event listener to be able to navigate the pages and show the selected page with the corresponding button shown as 'active'
   linkList.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
         const buttonList = linkList.children;
         const button = event.target;

         // This resets other buttons and clears their class name so only 1 button is shown as active
         for (let i = 0; i < buttonList.length; i++) {
            const buttonElement = buttonList[i].querySelector('button');
            buttonElement.className = '';
         }
         button.className = 'active';

         showPage(list, button.textContent);
      }
   });
}


// added event listeners to both the search bar and the button
// to dynamically display the student list that is being filter
searchBar.addEventListener('keyup', () => {
   search(searchBar, data);
});


searchButton.addEventListener('click', () => {
   search(searchBar, data);
})



// Call functions


showPage(data, 1);
addPagination(data);