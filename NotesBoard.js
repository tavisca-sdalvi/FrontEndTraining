window.onload=handleOnload;

function handleStickyClick(e) {
    var targetElement = null;
    if(e.target.classList.contains('sticky')) {
        targetElement = e.target;
    } else if(e.target.parentNode.classList.contains('sticky')) {
        targetElement = e.target.parentNode;
    }
    if(targetElement) {
        var index = targetElement.id.split('Sticky')[1];
        var  widgetElement = document.getElementsByClassName('ui-widget')[0];
        widgetElement.classList.remove('hidden');
        var widgetOverlayElement = document.getElementsByClassName('ui-widget-overlay')[0];
        widgetOverlayElement.classList.remove('hidden');
        for(var item in targetElement.classList) {
            if(localStorage.getItem(targetElement.classList[item]) !== null) {
                var stickyList = JSON.parse(localStorage.getItem(targetElement.classList[item]));
                for (var stickyIndex in stickyList) {
                    if(parseInt(index) === stickyList[stickyIndex].index) {
                        widgetElement.setAttribute('data-identifier', targetElement.id);
                        widgetElement.getElementsByClassName('formElement')[0].value = stickyList[stickyIndex].content;
                        widgetElement.getElementsByClassName('count')[0].innerText = stickyList[stickyIndex].voteCount;
                    }
                }
            }
        }
        document.getElementsByClassName('formElement')[0].innerText = e.target.value;
    } else {
        e.preventDefault();
    }
}
function handleOnload() {
    document.querySelector('.boardContainer').addEventListener('click', handleStickyClick);
    paintStickies();
}
function paintStickies() {
    var section1Sticky = [];
    var section2Sticky = [];
    var section3Sticky = [];

    if(localStorage.getItem("section1Sticky") !== null) {
        section1Sticky = JSON.parse(localStorage.getItem("section1Sticky"))
    }
    if(localStorage.getItem("section2Sticky") !== null) {
        section2Sticky = JSON.parse(localStorage.getItem("section2Sticky"));
    }
    if(localStorage.getItem("section3Sticky") !== null) {
        section3Sticky = JSON.parse(localStorage.getItem("section3Sticky"))
    }
    var stickyContainerList = document.getElementsByClassName('stickyContainer');
    for (var i = 0; i < stickyContainerList.length; i++) {
        stickyContainerList[i].innerHTML = "";
    }
    if(section1Sticky && section1Sticky.length > 0 ) {
        for (var sticky in section1Sticky) {
            showNewSticky("section1", section1Sticky[sticky])
        };
    }
    if(section2Sticky && section2Sticky.length > 0 ) {
        for (var sticky in section2Sticky) {
            showNewSticky("section2", section2Sticky[sticky])
        };
    }
    if(section3Sticky && section3Sticky.length > 0 ) {
        for (var sticky in section3Sticky) {
            showNewSticky("section3", section3Sticky[sticky])
        };
    }
}

function stickyObj(content,voteCount, index) {
    this.content = content;
    this.voteCount= voteCount;
    this.index = index;

}
function addSticky(e) {
    var parentSectionId = e.target.parentNode.parentNode.id;
    var parentSection = document.getElementById(parentSectionId);
    var addStickyElement = parentSection.getElementsByClassName('addNewSticky')[0];
    addStickyElement.classList.remove('hidden');
    addStickyElement.getElementsByClassName('stickyText')[0].focus();
}
function hideTextArea(e){
    var section1Sticky = [];
var section2Sticky = [];
var section3Sticky = [];

if(localStorage.getItem("section1Sticky") !== null) {
section1Sticky = JSON.parse(localStorage.getItem("section1Sticky"))
}
if(localStorage.getItem("section2Sticky") !== null) {
section2Sticky = JSON.parse(localStorage.getItem("section2Sticky"));
}
if(localStorage.getItem("section3Sticky") !== null) {
section3Sticky = JSON.parse(localStorage.getItem("section3Sticky"))
}
    e.target.parentNode.classList.add('hidden');
    if(e.target.value){
        var parentSectionId = e.target.parentNode.parentNode.id;
        if(parentSectionId == "section1") {
            section1Sticky.push(new stickyObj( e.target.value, 0, section1Sticky.length));
            localStorage.setItem("section1Sticky", JSON.stringify(section1Sticky));
            e.target.value = "";
            showNewSticky(parentSectionId,section1Sticky[section1Sticky.length-1]);
        }
        if(parentSectionId == "section2") {
            section2Sticky.push(new stickyObj( e.target.value, 0, section1Sticky.length));
            localStorage.setItem("section2Sticky", JSON.stringify(section2Sticky) );
            e.target.value = "";
            showNewSticky(parentSectionId,section2Sticky[section2Sticky.length-1]);
        }
        if(parentSectionId == "section3") {
            section3Sticky.push(new stickyObj( e.target.value, 0, section1Sticky.length));
            localStorage.setItem("section3Sticky", JSON.stringify(section3Sticky) );
            e.target.value = "";
            showNewSticky(parentSectionId,section3Sticky[section3Sticky.length-1]);
        }
    }
}
function showNewSticky(parentSectionId, sticky) { 
    var sectionExistingSticky = JSON.parse(localStorage.getItem(parentSectionId +"Sticky"));
    var element = document.createElement("div");
    element.classList.add('sticky',parentSectionId +"Sticky",'stickyBorder');
    element.id = parentSectionId + "Sticky" + sticky.index;
    var stickyTextElement = document.createElement("div");
    stickyTextElement.classList.add('stickyText');
    stickyTextElement.innerText = sticky.content;
    var voteCountElement = document.createElement("div");
    voteCountElement.classList.add('voteCount');
    voteCountElement.innerText = "+" + sticky.voteCount;
    element.append(stickyTextElement);
    element.append(voteCountElement);
    document.getElementById(parentSectionId).getElementsByClassName('stickyContainer')[0].appendChild(element);
}

function closeStickyWidget() {
    var  widgetElement = document.getElementsByClassName('ui-widget')[0];
    widgetElement.classList.add('hidden');
    var  widgetOverlayElement = document.getElementsByClassName('ui-widget-overlay')[0];
    widgetOverlayElement.classList.add('hidden');
}

function handleVoteCount(e) {
    var  widgetElement = document.getElementsByClassName('ui-widget')[0];
    var id = widgetElement.getAttribute('data-identifier');
    let idList = id.split('Sticky');
    var storageList = JSON.parse(localStorage.getItem(idList[0] + "Sticky"));
    for ( var index in storageList) {
        if(parseInt(idList[1]) ===  storageList[index].index) {
            storageList[index].voteCount = ++storageList[index].voteCount;
            localStorage.setItem(idList[0] + "Sticky", JSON.stringify(storageList));
            e.currentTarget.getElementsByClassName('count')[0].innerText = storageList[index].voteCount;
        }
    }
    paintStickies();
}

function storeStickyContent(e) {
    var  widgetElement = document.getElementsByClassName('ui-widget')[0];
    var id = widgetElement.getAttribute('data-identifier');
    let idList = id.split('Sticky');
    var storageList = JSON.parse(localStorage.getItem(idList[0] + "Sticky"));
    for ( var index in storageList) {
        if(parseInt(idList[1]) ===  storageList[index].index) {
            storageList[index].content = e.target.value;
            localStorage.setItem(idList[0] + "Sticky", JSON.stringify(storageList));
        }
    }
    closeStickyWidget();
    paintStickies();
}

function handleStickyDelete(e) {
    if (confirm('Do you want to delete this sticky?')) {
        var  widgetElement = document.getElementsByClassName('ui-widget')[0];
        var id = widgetElement.getAttribute('data-identifier');
        let idList = id.split('Sticky');
        var storageList = JSON.parse(localStorage.getItem(idList[0] + "Sticky"));
        for ( var index in storageList) {
            if(parseInt(idList[1]) ===  storageList[index].index) {
                storageList.splice(index, 1);
                localStorage.setItem(idList[0] + "Sticky", JSON.stringify(storageList));
            }
        }
        closeStickyWidget();
        paintStickies();
      } else {

      }
}