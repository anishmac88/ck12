var calendar = function () {
    // time values in mins
    var startTime = 540;
    var calendarTimePeriod = 720;
    var minutePixelSize = 2;
    var calendarWidth = 600;

    function initMeetingsPosition(meetings) {
        var vertical =0;
        for(var i=0;i <meetings.length; i++) {
                meetings[i].height = (meetings[i].end - meetings[i].start) * minutePixelSize;
                meetings[i].top = meetings[i].start * minutePixelSize
                if (!meetings[i].processed){
                    vertical += 1;
                    findNextMeeting(vertical,meetings,i,meetings[i].end)
                }
            }
        var width = parseInt(calendarWidth/vertical);
            for(var i=0;i <meetings.length; i++){
                meetings[i].width = width;
                meetings[i].left = (meetings[i].vertical - 1) * meetings[i].width;
            }
            console.log(meetings);
            return meetings;
    }

    function findNextMeeting(vertical,meetings,curIndex,endTime) {
        for (var i=0;i < meetings.length ;i++){
            if(!meetings[i].processed && meetings[i].start >= endTime){
                findNextMeeting(vertical,meetings,i,meetings[i].end);
                break;
            }
        }
        meetings[curIndex].processed = true;
        meetings[curIndex].vertical = vertical;

    }

    function sliceMeetingsAndInit(meetings) {
        if(!meetings){
            return [];
        }
        var max = meetings[0].end;
        for(var i=0;i<meetings.length;i++){
            if (meetings[i].start > max){
                return initMeetingsPosition(meetings.slice(0,i)).
                            concat(sliceMeetingsAndInit(meetings.slice(i,meetings.length)))
            }
            else{
                max = Math.max(max,meetings[i].end);
            }
        }
        return initMeetingsPosition(meetings);

    }

    return {
        fetchMeetingPostion : function (meetings) {
            meetings.sort(function(a,b) {return (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0);});
            return sliceMeetingsAndInit(meetings);

        },
        initCalendar:function () {
            var calendarNode = document.getElementById('calendar-container');
            calendarNode.style.width = calendarWidth + 'px';
            calendarNode.style.height = (calendarTimePeriod * minutePixelSize) + 'px';
            calendarNode.innerHTML = '';
            return this;
        }
    }
}();
