import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent} from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const inputLowRange: HTMLInputElement = <HTMLInputElement> document.getElementById("low-limit")!;
const inputUpperRange: HTMLInputElement = <HTMLInputElement> document.getElementById("upper-limit")!;
const btnfilterByRange: HTMLElement = document.getElementById("button-filterByCredits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByRange.onclick = () => applyFilterBycredits();

renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

function renderStudentInTable(st: Student): void {
  console.log('Desplegando estudiantes');
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>codigo</td>
                           <td>${st.codigo}</td>`;
    studentTbody.appendChild(trElement);
    
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>cedula</td>
                           <td>${st.cedula}</td>`;
    studentTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>edad</td>
                           <td>${st.edad}</td>`;
    studentTbody.appendChild(trElement);
  
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>direccion</td>
                           <td>${st.direccion}</td>`;
    studentTbody.appendChild(trElement);

    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>telefono</td>
                           <td>${st.telefono}</td>`;
    studentTbody.appendChild(trElement);
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterBycredits() { 
  let lowLim = parseInt(inputLowRange.value);
  let upperLim = parseInt(inputUpperRange.value);
  upperLim = (upperLim == 0) ? 0 : upperLim;
  lowLim = (lowLim == 0) ? 0 : lowLim;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByRange(lowLim,upperLim, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByRange(lowLim: number, upperLim: number, courses: Course[]) {
  if(upperLim < lowLim || upperLim == 0)
  {
    return dataCourses;
  }
  else{
    return courses.filter( c => 
    (c.credits <=upperLim && c.credits >=lowLim));
  }
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}