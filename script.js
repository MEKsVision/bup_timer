var app = new Vue({
    el: '#app',
    data: {
        current_time:"",
        months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        exam_started_at:"",
        exam_ending_time:"",
        duration_h:0,
        duration_m:0,
        duration_s:0,
        diffTime: 0,
        duration:0,
        interval:1000,
        timer_interval_object:null,
        exam_info:{
            title:"Enter the exam title here e.g. Final examination 2022",
            exams:[
                {
                    course_name:"Example Course",
                    course_code:"MICT-2203",
                    time: "2h 30 mins",
                    total_student: 55,
                    present:35,
                }
            ]
        }
    },
    created:function(){
        
    },
    mounted:function(){
    },
    computed:{

	},
    methods: {
        getCurrentTime(){
            this.current_time = moment(new Date()).format('DD MMM YYYY, hh:mm:ss a');
            setInterval(()=>{
                this.current_time = moment(new Date()).format('DD MMM YYYY, hh:mm:ss a');
                // console.log(this.exam_started_at);
            },1000)
            return this.current_time;
        },
        setStartedTime(){
            this.exam_started_at = moment(new Date())
            this.exam_ending_time = moment(this.exam_started_at).add(this.duration_h,"h").add(this.duration_m,"m").add(this.duration_s,"s");
            this.diffTime = this.exam_ending_time.valueOf() - this.exam_started_at.valueOf();
            this.duration = moment.duration(this.diffTime, 'milliseconds');


            // console.log("Exam Current time: ",this.exam_started_at.format('DD MMM YYYY, hh:mm:ss a'));
            // console.log("Exam Future time: ",futureTime.format('DD MMM YYYY, hh:mm:ss a'));
            if(this.timer_interval_object==null){
                this.timer_interval_object = setInterval(()=>{
                    if(this.duration>0){
                        this.duration = moment.duration(this.duration - this.interval, 'milliseconds');
                        // console.log(this.duration.hours() + ":" + this.duration.minutes() + ":" + this.duration.seconds());
                        this.duration_s = this.duration.seconds()
                        this.duration_m = this.duration.minutes()
                        this.duration_h = this.duration.hours()
                    }else{
                        this.stopInterval();
                    }
                },1000)
            }
        },
        stopInterval(){
            clearInterval(this.timer_interval_object)
            this.timer_interval_object = null
        }
    },
})

