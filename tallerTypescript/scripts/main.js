import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('student');
var inputLowRange = document.getElementById("low-limit");
var inputUpperRange = document.getElementById("upper-limit");
var btnfilterByRange = document.getElementById("button-filterByCredits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterBycredits(); };
renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(st) {
    console.log('Desplegando estudiantes');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>codigo</td>\n                           <td>" + st.codigo + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>cedula</td>\n                           <td>" + st.cedula + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>edad</td>\n                           <td>" + st.edad + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>direccion</td>\n                           <td>" + st.direccion + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>telefono</td>\n                           <td>" + st.telefono + "</td>";
    studentTbody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterBycredits() {
    var lowLim = parseInt(inputLowRange.value);
    var upperLim = parseInt(inputUpperRange.value);
    upperLim = (upperLim == 0) ? 0 : upperLim;
    lowLim = (lowLim == 0) ? 0 : lowLim;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByRange(lowLim, upperLim, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByRange(lowLim, upperLim, courses) {
    if (upperLim < lowLim || upperLim == 0) {
        return dataCourses;
    }
    else {
        return courses.filter(function (c) {
            return (c.credits <= upperLim && c.credits >= lowLim);
        });
    }
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
