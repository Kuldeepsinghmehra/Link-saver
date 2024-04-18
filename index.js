let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <div class="lead-item">
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                    <button class="delete-btn-item" data-index="${i}">Delete</button>
                </div>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;

    ulEl.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn-item")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            myLeads.splice(index, 1);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        }
    });
}
 
  

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function () {
    let newLead = inputEl.value.trim();
    if (!newLead.startsWith("http://") && !newLead.startsWith("https://")) {
        newLead = "http://" + newLead;
    }
    myLeads.push(newLead);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});
