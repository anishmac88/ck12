var meetings = [{start:60,end:150},{start:540,end:570},{start:555,end:600},{start:555,end:600},{start:585,end:660},{start:80,end:120}];


function applyRandomMeetings() {
    var numMeetings = Util.getRandomInt(1,18);
    var meetings = [];
    for (var i=0;i<numMeetings;i++){
        var start = Util.getRandomInt(0,700);
        var end = Util.getRandomInt(start,720);
        meetings.push({start:start,end:end});
    }
    renderMeetings(meetings);
}


function renderMeetings(meetings) {
    calendar.initCalendar().fetchMeetingPostion(meetings);
    var meetingsText = [];
    var calendarNode = document.getElementById('calendar-container');
    for (var i=0;i < meetings.length;i++) {
        meetingsText.push({start:meetings[i].start,end:meetings[i].end});
        var element = document.createElement('div');
        element.className = 'meeting-box';
        element.style.top = meetings[i].top + 'px';
        element.style.left = meetings[i].left + 'px';
        element.style.width = meetings[i].width + 'px';
        element.style.height = meetings[i].height + 'px';
        element.style.backgroundColor = Util.getRandomColor();
        element.innerHTML = i;
        calendarNode.appendChild(element);
    }
    document.getElementById('meetings-text').innerHTML = JSON.stringify(meetingsText);
}

renderMeetings(meetings);