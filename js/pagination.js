/*Defining constants for "number of students per page" (const studentsPerPage), 
"amount of students" (const studentsNumber) and, consequently, "how many pages 
will be needed to show all of them" (const pagesNumber)*/

const studentsPerPage = 10;
const studentsNumber = $('.student-list li').length;
const pagesNumber = Math.ceil(studentsNumber/studentsPerPage);

/*Creating a group of buttons with a variable number of buttons 
  depending of how many complete groups of students per page 
  can be created plus one with the remaining students. Initially, 
  button by default is "1 to 10". Then if you click another button 
  you can use its button.value to choose a different Group of Students */

function buttonCreation () {
	for (var j=1; j<=pagesNumber; j=j+1){
  		if (j === 1) {
			$("h2").append("<h4 class='groupNumber'><p>Choose a Button to Get Group of "+ studentsPerPage +" Students</p></h4><br>")
			$("h4").append("<br>");
			$("h4").append("<div class='one'></div>");
			$("div.one").append("<button class='grouping' value="+j+">"+"1 to 10"+"</button>");
  		} else if (j !== pagesNumber) {
			$("div.one").append("<button class='grouping' value="+j+">"+(1+(j-1)*10)+" to "+j*10+"</button>");
  		} else {
  			$("div.one").append("<button class='grouping' value="+j+">"+(1+(j-1)*10)+" to "+j*10+"</button>");
  		};
	};
};

/*Creating seven parameters per each student: */
function generateStudentData(i) {

	let studentData = {
		idnumber: 0,
		group: 0,
		member: 0,
		photo: '',
		name: '',
		email: '',
		enrollment: '',
	};

	/*First 3 student characteristics are: a Student Number, a Group(of ten) and 
	  his/her Member position in the Group*/
  
	studentData.idnumber = i; 			                 //<-- 1.Student´s Number

	let liOrder = Math.ceil(i/studentsPerPage);		
	studentData.group = liOrder;	                     // <-- 2.Student´s Group (of ten)

	let studentsGroup = Math.ceil(i/studentsPerPage);
	let memberNumber = 0
	if (i >10) {
		memberNumber = i-(10*(studentsGroup-1));			
	} else {
		memberNumber = i;								
	}
	studentData.member = memberNumber;	                 // <-- 3.Student´s Member posiiton

	/*Last 4 student characteristics are: the Student Photo, the Student Name, 
	  the Student Email and his Enrollment Date*/

	let liNumberImage = 'li:nth-child('+(i)+') .student-details img';
	let first = $(liNumberImage).attr('src');
	studentData.photo = first;                           // <-- 4.Student´s Photo										
	
	let liNumberName = 'li:nth-child('+(i)+') .student-details h3';
	let second = $(liNumberName).text();
	studentData.name = second;                           // <-- 5.Student´s Name
	
	let liNumberEmail = 'li:nth-child('+(i)+') .student-details span';
	let third = $(liNumberEmail).text();
	studentData.email = third;		                     // <-- 6.Student´s email

	let liDate = 'li:nth-child('+(i)+') .joined-details span';
	let fourth = $(liDate).text();
	studentData.enrollment = fourth;                    // <-- 7.Student´s enrollment Date

	//Returning the seven property values of the object generated per each student
	return {
		idnumber: i,
		group: liOrder,
		member: memberNumber,
		photo: first,
		name: second,
		email: third,
		enrollment: fourth,
	};	
}

/*Calling for the generation of the seven parameters per each student: 
(separating data generation from other functionalities)               */
function generateStudentsData() {
	let studentsData = [];
	for (let i=1; i<=studentsNumber; i+=1) {
		let student = generateStudentData(i);
		studentsData.push(student);	
	};
	return studentsData
}

/*Calling to generate and show the group of students of the choosen page:
	- by clicking one of the buttons, or 
	- by default the ones that are in the first page     */

function studentsShow (page) {
  let i = 1	
  for (let=1; i<= studentsNumber; i +=1){
  	studentShow (i,page);
  	$('ul.student-list').show();	
  }
}

/*Generating the group of students of the choosen page */

function studentShow(i,page) {
	// Does the student belong to the choosen page?	
 	if (studentsData[i-1].group === page) {
	// If yes show them

		//Creating a new list
		let li = document.createElement('li');
		ul.appendChild(li);
		li.className = "student-item cf";

		/*Defining and appending with the  right content div blocks per 
		each new student taht we want to show  */
		let divOrdinal1 = 2*studentsData[i-1].member-1;
		let divOrdinal2 = 2*studentsData[i-1].member;

		let divNumber1 = 'div'+divOrdinal1;
		let divNumber2 = 'div'+divOrdinal2;

		let div1 = document.createElement(divNumber1);
		let div2 = document.createElement(divNumber2);
		li.appendChild(div1);
		div1.className = "student-details";
		li.appendChild(div2);
		div2.className = "joined-details";

		$(div1).append("<img class='avatar' src=" + studentsData[i-1].photo       + ">");
		$(div1).append("<h3> #" + studentsData[i-1].idnumber + " "+ studentsData[i-1].name + "</h3>");	
		$(div1).append("<span class='email'>"     + studentsData[i-1].email       + "</span>");

		$(div2).append("<span class='date'>"      + studentsData[i-1].enrollment  + "</span>");

		//Erasing any student search that could have been shown previously	
		$('divLook').empty();
		 	};	
};

/*Creating the functionality to find a student */

function lookingForStudent() {
	//Creaton the input box and the submit button
	$("h4").append("<form class='student-search'>");
	$("form").append("<input type='text' name='name' placeholder='Search for Students'>");	
	$("form").append("<button class= 'search' type='submit' name='submit' value='submit'>Search</button>");

	const form = document.querySelector('form');
	const input = form.querySelector("input[placeholder='Search for Students']");
	let text = input.value;
	let submitCounter = 0;

	//Listening to the name that is written
	form.addEventListener('submit', (e) => {
		//Avoididng automatic refreshments
		e.preventDefault();
		//Eliminating results of previous searchs
		if (submitCounter >0) {
			$('divLook').empty();			
		};
		submitCounter +=1;
		let counter = 0

		for (let k=1; k<=studentsNumber; k+=1) {	

		//Preparing to receive incomplete names
			//Separating name from family name
			let nameSeparator = studentsData[k-1].name.indexOf(' ');
			let nameSearchedSeparator = input.value.indexOf(' ');
			
			let firstName = studentsData[k-1].name.substring(0,nameSeparator);
			let firstNameSearched = input.value.substring(0,nameSearchedSeparator);

			//Family names can be introduced with name or without it
			let familyName = studentsData[k-1].name.substring((nameSeparator+1), studentsData[k-1].name.length);
			let familyNameSearched = input.value.substring((nameSearchedSeparator+1), input.value.length) 

			//Correcting situations where only the name is typed
			if (nameSearchedSeparator < 0) {
				firstNameSearched = familyNameSearched;
			}

			//Showing the positive results of the search (one or several)
			if (studentsData[k-1].name === input.value || firstName === firstNameSearched || familyName === familyNameSearched) {
				let divLook = document.createElement('div');
				$("div.page-header.cf").append("<divLook class='student-found'><p class='message'>" + 
				studentsData[k-1].name + 
				" is the student number " + studentsData[k-1].idnumber+" who " + 
				studentsData[k-1].enrollment + "<br> His/Her contact address is:  "+ 
				studentsData[k-1].email+"<br><img class='avatar' src="+  
				studentsData[k-1].photo +"></p></divLook>");
			} else {
				//Showing the negative results of the search
				counter +=1;
				if (counter === studentsNumber) { 
					$("div.page-header.cf").append("<divLook class='student-found'><p class='message'>"+
					"No student with this name is currently enrolled</p></divLook>"); 
				};
			};		
		};
		//Cleaning the input box
		input.value = '';
	});
}


//0.- Hiding all data shown
$('ul.student-list').hide();

//1.- We paint the pagination buttons.
buttonCreation();
	/*Creating a variable group of buttons depending of how many complete 
	groups of 10 students can be created plus one with the remaining students
	This set of buttons will serve to choose which group of students it is shown */

let h2 = document.querySelector('h2');
let ul = document.querySelector('ul');
let h4 = document.querySelector('h4');

//2.- We generate all students data 
let studentsData = generateStudentsData();

//2-a.- We enable the capability to find if a student is in the list
lookingForStudent();

//2-b.- We clean the "ul" to introduce the group of ten students we have choosen
$('ul.student-list').empty();

//3.- We listen to the pagination buttons click
h2.addEventListener('click', (e) => {
	let prepage = e.target.value;
	let page = parseInt(prepage);
	$('ul.student-list').empty();

	/* and we show the 10 students included in that choosen page*/
	studentsShow(page);
})

//4.- By default, in the absence of any pagination button click, we show the 10 first students
studentsShow(1);