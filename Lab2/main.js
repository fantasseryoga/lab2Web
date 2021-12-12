window.onload = () => {
	checkLCNull();
	get(-1);
	
	var stage;
	var form_menu = document.querySelector("#page_choise");
	form_menu.addEventListener("change", function(e) {
		let target = e.target;
		let message;
		switch (target.id) {
			case 'client':
				stage = 0;
				break;
			case 'project':
				stage = 1;
				break;
			case 'employee':
				stage = 2;
				break;
			case 'projectOnGoing':
				stage = 3;
				break;
		}
		render(stage);
	});
	var form_create = document.querySelector("#form_create");
	form_create.addEventListener("submit", function(e) {
		switch (stage) {
			case 0:
				let ID0 = form_create.elements['id'].value;
				form_create.elements['id'].value='';
				let Name0 = form_create.elements['name'].value;
				form_create.elements['name'].value='';
				let LastName0 = form_create.elements['lastName'].value;
				form_create.elements['lastName'].value='';
				let Age0 = form_create.elements['age'].value;
				form_create.elements['age'].value='';
				let Gender0 = form_create.elements['gender'].value;
				form_create.elements['gender'].value='';
				addClient(Name0, LastName0, Age0, Gender0, ID0);
				break;
			case 1:
				let ID1 = form_create.elements['id'].value;
				form_create.elements['id'].value='';
				let Name1 = form_create.elements['name'].value;
				form_create.elements['name'].value='';
				let Deadline1 = form_create.elements['deadline'].value;
				form_create.elements['deadline'].value='';
				let ClientId1 = form_create.elements['client'].value;
				form_create.elements['client'].value='';
				let EmployeeId1 = form_create.elements['employee'].value;
				form_create.elements['employee'].value='';
				addProject(Name1, Deadline1, ID1, ClientId1, EmployeeId1);
				break;
			case 2:
				let ID2 = form_create.elements['id'].value;
				form_create.elements['id'].value='';
				let Name2 = form_create.elements['name'].value;
				form_create.elements['name'].value='';
				let LastName2 = form_create.elements['lastName'].value;
				form_create.elements['lastName'].value='';
				let Age2 = form_create.elements['age'].value;
				form_create.elements['age'].value='';
				let Experience2 = form_create.elements['experience'].value;
				form_create.elements['experience'].value='';
				let Gender2 = form_create.elements['gender'].value;
				form_create.elements['gender'].value='';
				addEmployee(Name2, LastName2, Age2, Experience2, Gender2, ID2);
				break;
			case 3:
				let ID3 = form_create.elements['project'].value;
				form_create.elements['project'].value='';
				let Client_ID3 = form_create.elements['client'].value;
				form_create.elements['client'].value='';
				let Employee_ID3 = form_create.elements['employee'].value;
				form_create.elements['employee'].value='';
				addProjectOnGoing(Employee_ID3, 	Client_ID3, ID3);
				break;
		}
		render_table(stage);
		e.preventDefault();
	});
}


function render(t_id) {
	render_create(t_id);
	render_table(t_id);
}

function render_table(t_id){
	let element = document.querySelector("#show_table");
	element.innerHTML = '';
	{
		let res = '';
		switch(t_id){
			case 0:
				if(Clients.length ===0){
					res = 'No Clients here';
				}
				console.log(Clients)
				break;
			case 1:
				if(Projects.length ===0){
					res = 'No Projects here';
				}
				break;
			case 2:
				if(Employees.length ===0){
					res = 'No Employees here';
				}
				break;
			case 3:
				if(ProjectsOnGoing.length ===0){
					res = 'No Projects here';
				}
				break;
		}
		if(res !== ''){
			const p = document.createElement('p');
			p.innerHTML = res;
			element.append(p);
			return;
		}
		
	}
	const table = document.createElement('table');
	
	//Генерація заголовків колонок
	const thead = document.createElement('thead');
	table.append(thead);
	const tr = document.createElement('tr');
	thead.append(tr);
	let h_des = getNameFields(t_id);
	h_des.push("Actions");
	
	for(let i=0; i<h_des.length; i++) {
		const th = document.createElement('th');
		th.innerHTML = h_des[i];
		tr.append(th);
	}
	
	const tbody = document.createElement('tbody');
	table.append(tbody);
	element.append(table);
		switch(t_id){
		case 0:
			for (let element of Clients) {
				let id = element.id;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","deleteClient("+id+");render_table("+t_id+")");
				td.append(del);
				const edit = document.createElement('button');
				edit.setAttribute("type","button");
				edit.innerHTML = "Edit";
				edit.setAttribute("onclick","editClient("+id+");");
				td.append(edit);
				tr.append(td);
			}
			break;
		case 1:
			for (let element of Projects) {
				let id = element.id;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","deleteProject("+id+");render_project("+t_id+")");
				td.append(del);
				const edit = document.createElement('button');
				edit.setAttribute("type","button");
				edit.innerHTML = "Edit";
				edit.setAttribute("onclick","editProject("+id+");");
				td.append(edit);
				tr.append(td);
			}
			break;
		case 2:
			for (let element of Employees) {
				let id = element.id;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","deleteEmployee("+id+");render_table("+t_id+")");
				td.append(del);
				const edit = document.createElement('button');
				edit.setAttribute("type","button");
				edit.innerHTML = "Edit";
				edit.setAttribute("onclick","editEmployee("+id+");");
				td.append(edit);
				tr.append(td);
			}
			break;
		case 3:
			for (let element of ProjectsOnGoing) {
				let id = element.project;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","deleteProjectOnGoing("+id+");render_table("+t_id+")");
				td.append(del);
				tr.append(td);
			}
			break;
	}
}

function render_create(t_id){
	let element = document.querySelector("#create");
	element.innerHTML = '';
	
	let h_des = getNameFields(t_id);
	
	for(let i = 0; i < h_des.length; i++){
		const div = document.createElement('div');
		div.className += "menu_option";
		const label = document.createElement('label');
		label.setAttribute("for", h_des[i]);
		label.innerHTML = h_des[i]+":";
		div.append(label);
		
		const input = document.createElement('input');
		input.setAttribute("type","text");
		input.setAttribute("id",h_des[i]);
		input.setAttribute("name",h_des[i]);
		div.append(input);
		element.append(div);
	}
	const div = document.createElement('div');
	div.className += "menu_option";
	const submit = document.createElement("input");
	submit.setAttribute("type","submit");
	submit.setAttribute("value","Submit");
	submit.setAttribute("id","Submit"+t_id);
	div.append(submit);
	element.append(div);
}

function getNameFields(t_id){
	let t_obj;
	switch(t_id){
		case 0:
			t_obj = new Client();
			break;
		case 1:
			t_obj = new Project();
			break;
		case 2:
			t_obj = new Employee();
			break;
		case 3:
			t_obj = new ProjectOnGoing();
			break;
	}
	return Object.keys(t_obj);
}

// function gen_rep1(){
// 	let marina_id = document.querySelector("#rep1").value;
// 	document.querySelector("#rep1").value = '';
// 	if(find_marina(marina_id)==undefined){
// 		alert("Error! Enter ID of an existing marina.");
// 		location.reload();
// 		return;
// 	}
// 	const header = document.querySelector("#header");
// 	header.innerHTML="";
// 	const cont = document.querySelector("#content");
// 	cont.innerHTML="";
// 	let res = find_all_ships_on_marina(marina_id);
// 	if(res !== null){
// 		cont.innerHTML += res.toString();
// 	} else {
// 		cont.innerHTML += "No ships";
// 	}
// 	const exit_btn = document.createElement("input");
// 	exit_btn.setAttribute("value", "Back");
// 	exit_btn.setAttribute("type", "button");
// 	exit_btn.setAttribute("onclick","location.reload();");
// 	exit_btn.className+="mar";
// 	document.body.append(exit_btn);
// }
// function gen_rep2(){
// 	let port_id = document.querySelector("#rep2").value;
// 	document.querySelector("#rep2").value = '';
// 	if(find_port(port_id)==undefined){
// 		alert("Error! Enter ID of an existing port.");
// 		location.reload();
// 		return;
// 	}
// 	const header = document.querySelector("#header");
// 	header.innerHTML="";
// 	const cont = document.querySelector("#content");
// 	cont.innerHTML="";
// 	let res = find_all_ships_on_port(port_id);
// 	if(res !== undefined){
// 		cont.innerHTML += res.toString();
// 	} else {
// 		cont.innerHTML += "No ships";
// 	}
// 	const exit_btn = document.createElement("input");
// 	exit_btn.setAttribute("value", "Back");
// 	exit_btn.setAttribute("type", "button");
// 	exit_btn.setAttribute("onclick","location.reload();");
// 	exit_btn.className+="mar";
// 	document.body.append(exit_btn);
// }

class Client {
    constructor(name, lastName, age, gender, id){
        this.name = name
        this.lastName = lastName
        this.age = age
        this.gender = gender
        this.id = id
    }
}

class Project {
    constructor(name, deadline, id, clientId, employeeId){
        this.id = id
        this.name = name
        this.deadline = deadline
        this.client = clientId
        this.employee = employeeId
    }
}

class Employee {
    constructor(name, lastname, age, experience, gender, id){
        this.name = name
        this.lastName = lastname
        this.age = age
        this.experience = experience
        this.gender = gender
        this.id = id
    }
}

class ProjectOnGoing {
    constructor(employeeId, clientId, projectId) {
        this.employee = employeeId
        this.client = clientId
        this.project = projectId
    }
}

let ProjectsOnGoing = new Array(0);
let Employees = new Array(0);
let Projects = new Array(0);
let Clients = new Array(0);

function upload(id){
	switch(id){
		case -1:
			localStorage.setItem('c', JSON.stringify(Clients));
			localStorage.setItem('p', JSON.stringify(Projects));
			localStorage.setItem('e', JSON.stringify(Employees));
			localStorage.setItem('po', JSON.stringify({ProjectsOnGoing}));
			break;
		case 0:
			localStorage.setItem('c', JSON.stringify(Clients));
			break;
		case 1:
			localStorage.setItem('p', JSON.stringify(Projects));
			break;
		case 2:
			localStorage.setItem('e', JSON.stringify(Employees));
			break;
		case 3:
			localStorage.setItem('po', JSON.stringify(ProjectsOnGoing));
			break;
	}
}
function get(id){
	switch(id){
		case -1:
			Clients = JSON.parse(localStorage.getItem('c'));
			Projects = JSON.parse(localStorage.getItem('p'));
			Employees = JSON.parse(localStorage.getItem('e'));
			ProjectsOnGoing = JSON.parse(localStorage.getItem('po', ProjectsOnGoing));
			break;
		case 0:
			Clients = JSON.parse(localStorage.getItem('c'));
			break;
		case 1:
			Projects = JSON.parse(localStorage.getItem('p'));
			break;
		case 2:
			Employees = JSON.parse(localStorage.getItem('e'));
			break;
		case 3:
			ProjectsOnGoing = JSON.parse(localStorage.getItem('po', ProjectsOnGoing));
			break;
	}
}
function checkLCNull(){
	if(localStorage.getItem('c') == undefined){
		upload(0);
	}
	if(localStorage.getItem('p') == undefined){
		upload(1);
	}
	if(localStorage.getItem('e') == undefined){
		upload(2);
	}
	if(localStorage.getItem('po') == undefined){
		upload(3);
	}
}

function cleanLC(){
	localStorage.removeItem('c');
	localStorage.removeItem('p');
	localStorage.removeItem('e');
	localStorage.removeItem('po');
}

function addClient(name, lastName, age, gender, id){
	if(findClient(id)==undefined){
		Clients.push(new Client(name, lastName, age, gender, id));
		console.log(Clients)
		upload(0);
		console.log(Clients)
		return;
	}
	alert('Client [ID: ' + id + '] already exists');
}

function addEmployee(name, lastName, age, experience, gender, id){
	if(findEmployee(id)==undefined){
		Employees.push(new Employee(name, lastName, age, experience, gender, id));
		upload(2);
		return;
	}
	alert('Employee [ID: ' + id + '] already exists');
}

function addProject(name, deadline, id, clientId, employeeId){
	if(findClient(clientId)==undefined){
		alert('Client [ID: ' + clientId + '] does not exist');
		return;
	}
	if(findEmployee(employeeId)==undefined){
		alert('Employee [ID: ' + employeeId + '] does not exist');
		return;
	}
	if(findProject(id)==undefined){
		Projects.push(new Project(name, deadline, id, clientId, employeeId));
		upload(1);
		return;
	}
	alert('Project [ID: ' + id + '] already exists');
}

function addProjectOnGoing(employee, client, project){
	if(findClient(client)==undefined){
		alert('Client [ID: ' + clientId + '] does not exist');
		return;
	}
	if(findEmployee(employee)==undefined){
		alert('Employee [ID: ' + employeeId + '] does not exist');
		return;
	}
	if(findProjectsOnGoing(project)==undefined){
		ProjectsOnGoing.push(new ProjectOnGoing(employee, client, project));
		upload(3);
		return;
	}
	alert('Project [ID: ' + project + '] already exists');
}

function deleteClient(clientId){
	get(0)
	if(ProjectsOnGoing.filter(project => project.client === clientId).length === 0){
		Clients = Clients.filter(client => client.id != clientId);
		upload(0)
		return;
	}
	alert("We can't delete Client [ID: " + clientId + "] have projects on going");
}

function deleteEmployee(employeeId){
	get(2)
	if(ProjectsOnGoing.filter(project => project.employee === employeeId).length === 0){
		Employees = Employees.filter(employee => employee.id != employeeId);
		upload(2)
		return;
	}
	alert("We can't delete Employee [ID: " + employeeId + "] have projects on going");
}

function deleteProject(projectId){
	get(1)
    Projects = Projects.filter(project => project.id != projectId);
	upload(1)
    ProjectsOnGoing = ProjectsOnGoing.filter(project => project.project != projectId);
	
}

function deleteProjectOnGoing(projectId){
	get(3)
    ProjectsOnGoing = ProjectsOnGoing.filter(p => p.project != projectId);
	upload(3)
}

//Пошук

function findClient(id){
	get(0);
	return Clients.find(client => client.id === id);
}

function findProject(id){
	get(1);
	return Projects.find(project => project.id === id);
}

function findEmployee(id){
	get(2);
	return Employees.find(employee => employee.id === id);
}

function findProjectsOnGoing(projectId){
	get(3);
	return ProjectsOnGoing.find(projectOn => projectOn.project === projectId);
}

function findClientProjects(clientId) {
	return Projects.find(project => project.client === clientId)
}

function findEmployeeProjects(employeeId) {
	return Projects.find(project => project.employee === employeeId)
}

//Редагування

function editClient(clientId, parameters){
	let client = Clients.find(client => client.id === clientId);
	if ("name" in parameters) {
        client.name = parameters.name
    }
    if ("lastName" in parameters) {
        client.lastName = parameters.lastName
    }
    if ("age" in parameters) {
        client.age = parameters.age
    }
    if ("gender" in parameters) {
        client.gender = parameters.gender
    }
}

function editEmployee(employeeId, parameters){
	let employee = Employees.find(employee => employee.id === employeeId);
	if ("name" in parameters) {
        employee.name = parameters.name
    }
    if ("lastName" in parameters) {
        employee.lastName = parameters.lastName
    }
    if ("age" in parameters) {
        employee.age = parameters.age
    }
    if ("gender" in parameters) {
        employee.gender = parameters.gender
    }
    if ("experience" in parameters) {
        employee.experience = parameters.experience
    }

}

function editProject(projectId, parameters){
	let project = Projects.find(project => project.id === projectId);
	if ("name" in parameters) {
        project.name = parameters.name
    }
    if ("deadline" in parameters) {
        project.deadline = parameters.deadline
    }
    if ("client" in parameters) {
        project.client = parameters.client
    }
    if ("employee" in parameters) {
        project.employee = parameters.employee
    }

}

function editProjectOnGoing(projectId, parameters){
	get(3)
	let project = ProjectsOnGoing.find(project => project.project === projectId);
	if ("project" in parameters) {
        project.project = parameters.project
    }
    if ("client" in parameters) {
        project.client = parameters.client
    }
    if ("employee" in parameters) {
        project.employee = parameters.employee
    }

}

function rep1(){
	let clientId = document.querySelector("#rep1").value;
	document.querySelector("#rep1").value = '';
	if(findClient(clientId)==undefined){
		alert("Error! Enter ID of an existing Client.");
		location.reload();
		return;
	}
	const header = document.querySelector("#header");
	header.innerHTML="";
	const cont = document.querySelector("#content");
	cont.innerHTML="";
	let res = findClientProjects(clientId);
	if(res !== null){
		cont.innerHTML += JSON.stringify(res);
	} else {
		cont.innerHTML += "No projects";
	}
	const exit_btn = document.createElement("input");
	exit_btn.setAttribute("value", "Back");
	exit_btn.setAttribute("type", "button");
	exit_btn.setAttribute("onclick","location.reload();");
	exit_btn.className+="mar";
	document.body.append(exit_btn);
}

function rep2(){
	let employeeId = document.querySelector("#rep2").value;
	document.querySelector("#rep2").value = '';
	if(findEmployee(employeeId)==undefined){
		alert("Error! Enter ID of an existing Employee.");
		location.reload();
		return;
	}
	const header = document.querySelector("#header");
	header.innerHTML="";
	const cont = document.querySelector("#content");
	cont.innerHTML="";
	let res = findEmployeeProjects(employeeId);
	if(res !== undefined){
		cont.innerHTML += JSON.stringify(res);
	} else {
		cont.innerHTML += "No projects";
	}
	const exit_btn = document.createElement("input");
	exit_btn.setAttribute("value", "Back");
	exit_btn.setAttribute("type", "button");
	exit_btn.setAttribute("onclick","location.reload();");
	exit_btn.className+="mar";
	document.body.append(exit_btn);
}

function findProjectsByDate(deadline) {
	let projects = new Array(0)
	for (let i = 0; i < Projects.length; i++){
		if(Projects[i].deadline === deadline){
			projects.push(Projects[i])
		}
		console.log(Projects[i])
	}
	console.log(projects)
	return projects
}

function rep3(){
	let date = document.querySelector("#rep3").value;
	document.querySelector("#rep3").value = '';
	const header = document.querySelector("#header");
	header.innerHTML="";
	const cont = document.querySelector("#content");
	cont.innerHTML="";
	let res = findProjectsByDate(date);
	if(res !== undefined){
		cont.innerHTML += JSON.stringify(res);
	} else {
		cont.innerHTML += "No projects";
	}
	const exit_btn = document.createElement("input");
	exit_btn.setAttribute("value", "Back");
	exit_btn.setAttribute("type", "button");
	exit_btn.setAttribute("onclick","location.reload();");
	exit_btn.className+="mar";
	document.body.append(exit_btn);
}